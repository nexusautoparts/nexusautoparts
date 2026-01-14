import "dotenv/config";
import { PublicClientApplication, LogLevel } from "@azure/msal-node";
import fs from "fs";
import path from "path";

// Function to handle the authentication flow manually
async function manualDeviceFlow() {
    console.log("Starting authentication...");

    // Debug: Print environment variables logic
    const clientId = process.env.AZURE_CLIENT_ID;
    const tenantId = process.env.AZURE_TENANT_ID || "common";

    console.log(`Debug Info:`);
    console.log(`- Client ID (first 5 chars): ${clientId ? clientId.slice(0, 5) : "MISSING"}`);
    console.log(`- Tenant ID: ${tenantId}`);

    // Debug Secret (Masked)
    const secret = process.env.AZURE_CLIENT_SECRET || "";
    console.log(`- Secret Loaded: ${secret ? "YES" : "NO"}`);
    if (secret) {
        console.log(`- Secret Length: ${secret.length}`);
        console.log(`- Secret Prefix: ${secret.slice(0, 3)}...`);
    } else {
        console.warn("WARNING: No Client Secret found. This flow may fail if the app is Confidential.");
    }

    if (!clientId) {
        console.error("ERROR: AZURE_CLIENT_ID is missing from .env file.");
        return;
    }

    console.log("\nRequesting Device Code from Microsoft...");

    // 1. Get Code
    try {
        const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/devicecode`;
        console.log(`- Endpoint: ${tokenEndpoint}`);

        const codeResp = await fetch(tokenEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: clientId,
                scope: "Files.ReadWrite offline_access User.Read"
            })
        });

        // Log raw response status
        console.log(`- Response Status: ${codeResp.status} ${codeResp.statusText}`);

        const responseText = await codeResp.text();
        // console.log(`- Raw Response Body: ${responseText}`); // Uncomment if needed, but JSON parse below handles it

        let codeData;
        try {
            codeData = JSON.parse(responseText);
        } catch (e) {
            console.error("ERROR: Failed to parse response as JSON. Raw body:", responseText);
            return;
        }

        // Handle API Errors
        if (codeData.error) {
            console.error("\n==================================================================");
            console.error("MICROSOFT API ERROR:");
            console.error(`Error: ${codeData.error}`);
            console.error(`Description: ${codeData.error_description}`);
            console.error("==================================================================\n");
            return;
        }

        // Handle Missing Message (Unexpected Success format?)
        if (!codeData.message) {
            console.error("DEBUG: Unexpected response structure (missing 'message'). Full object:");
            console.log(JSON.stringify(codeData, null, 2));
        }

        console.log("\n==================================================================");
        console.log("ACTION REQUIRED:");
        console.log(codeData.message || "Please check the console output above for the login code.");
        console.log("==================================================================\n");

        if (!codeData.device_code) {
            console.error("ERROR: No device_code received. Cannot proceed.");
            return;
        }

        // 2. Poll for Token
        console.log("Waiting for functionality...");
        const interval = 5000;
        const expires = Date.now() + (codeData.expires_in * 1000);

        while (Date.now() < expires) {
            await new Promise(r => setTimeout(r, interval));

            const tokenResp = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    grant_type: "urn:ietf:params:oauth:grant-type:device_code",
                    client_id: clientId,
                    client_secret: process.env.AZURE_CLIENT_SECRET || "",
                    device_code: codeData.device_code
                })
            });

            const tokenData = await tokenResp.json();

            if (tokenData.error) {
                if (tokenData.error === "authorization_pending") {
                    process.stdout.write(".");
                    continue;
                }
                console.log("\nPolling Error: " + tokenData.error);
                return;
            }

            if (tokenData.refresh_token) {
                console.log("\n\nSUCCESS! Authentication complete.");

                const envPath = path.resolve(process.cwd(), ".env");
                let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "";

                // Clean up old token if exists
                const lines = envContent.split("\n").filter(l => !l.startsWith("AZURE_REFRESH_TOKEN="));
                lines.push(`AZURE_REFRESH_TOKEN=${tokenData.refresh_token}`);

                fs.writeFileSync(envPath, lines.join("\n"));
                console.log("Updated .env with new Refresh Token.");
                console.log("Please restart your server now (Ctrl+C, then npm run dev).");
                return;
            }
        }
    } catch (err) {
        console.error("Network or Script Error:", err);
    }
}

manualDeviceFlow();

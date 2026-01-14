import "dotenv/config";

async function testRefresh() {
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const tenantId = process.env.AZURE_TENANT_ID;
    const refreshToken = process.env.AZURE_REFRESH_TOKEN;

    console.log("------------------------------------------");
    console.log("DIAGNOSTIC TEST");
    console.log("------------------------------------------");
    console.log("Node Version:", process.version);
    console.log(`Client ID: '${clientId?.slice(0, 3)}...${clientId?.slice(-3)}'`);
    console.log(`Secret:    '${clientSecret?.slice(0, 3)}...${clientSecret?.slice(-3)}'`);
    console.log(`Tenant:    '${tenantId}'`);
    console.log("------------------------------------------");

    if (!clientId || !clientSecret || !tenantId) {
        console.error("CRITICAL ERROR: Missing environment variables.");
        return;
    }

    // TEST 1: Client Credentials (The most basic test of ID + Secret)
    console.log("\nTEST 1: Client Credentials Flow (Validating Secret)...");
    try {
        const credsResp = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: clientId,
                client_secret: clientSecret,
                scope: "https://graph.microsoft.com/.default"
            })
        });

        const credsData = await credsResp.json();

        if (credsData.error) {
            console.error("FAILED (Client Credentials):");
            console.error(JSON.stringify(credsData, null, 2));
            console.error("CONCLUSION: Your Client ID or Secret is INCORRECT (or Tenant ID is wrong).");
        } else {
            console.log("SUCCESS! Secret is valid.");
            console.log("App Access Token acquired.");
        }
    } catch (e) {
        console.error("Network Error during Test 1:", e);
    }

    if (!refreshToken) {
        console.warn("Skipping Test 2 & 3 (No Refresh Token).");
        return;
    }

    // TEST 2: Refresh Token Flow (WITH Secret - Confidential Client Mode)
    console.log("\nTEST 2: Refresh Token Exchange (WITH Secret)...");
    try {
        const tokenResp = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                scope: "Files.ReadWrite offline_access User.Read"
            })
        });

        const tokenData = await tokenResp.json();

        if (tokenData.error) {
            console.error("FAILED (Refresh Token WITH Secret):");
            console.error(JSON.stringify(tokenData, null, 2));
        } else {
            console.log("SUCCESS! Refresh Token exchanged for Access Token (WITH Secret).");
        }
    } catch (e) {
        console.error("Network Error during Test 2:", e);
    }

    // TEST 3: Refresh Token Flow (NO Secret - Public Client Mode)
    console.log("\nTEST 3: Refresh Token Exchange (NO Secret)...");
    try {
        const tokenResp = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                client_id: clientId,
                // NO SECRET HERE
                refresh_token: refreshToken,
                scope: "Files.ReadWrite offline_access User.Read"
            })
        });

        const tokenData = await tokenResp.json();

        if (tokenData.error) {
            console.error("FAILED (Refresh Token NO Secret):");
            console.error(JSON.stringify(tokenData, null, 2));
        } else {
            console.log("SUCCESS! Refresh Token exchanged for Access Token (NO Secret).");
            console.log("User Access Token acquired.");
        }
    } catch (e) {
        console.error("Network Error during Test 3:", e);
    }
}

testRefresh();

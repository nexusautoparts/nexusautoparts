import { ConfidentialClientApplication } from "@azure/msal-node";
import { Client } from "@microsoft/microsoft-graph-client";

// Configuration
const msalConfig = {
    auth: {
        clientId: process.env.AZURE_CLIENT_ID || "",
        clientSecret: process.env.AZURE_CLIENT_SECRET || "",
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    },
};

const cca = new ConfidentialClientApplication(msalConfig);

async function getAccessToken() {
    // Debug Credentials
    const secret = process.env.AZURE_CLIENT_SECRET || "";
    const clientId = process.env.AZURE_CLIENT_ID || "";
    console.log(`GraphService: Using ClientID: ${clientId.slice(0, 5)}..., Secret: ${secret.slice(0, 3)}... (Length: ${secret.length})`);

    // STRATEGY 1: Try User Refresh Token (Delegated Flow - Bypass Admin Consent)
    if (process.env.AZURE_REFRESH_TOKEN) {
        try {
            const tenantId = process.env.AZURE_TENANT_ID || "common";
            const tokenResp = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    grant_type: "refresh_token",
                    client_id: clientId,
                    // client_secret: secret, // Public Client Refresh must NOT have secret
                    refresh_token: process.env.AZURE_REFRESH_TOKEN,
                    scope: "Files.ReadWrite offline_access User.Read"
                })
            });
            const data = await tokenResp.json();
            if (data.access_token) return data.access_token;
            console.warn("Refresh token exchange failed:", JSON.stringify(data, null, 2));
        } catch (e) {
            console.warn("Refresh token fetch error:", e);
        }
    }

    // STRATEGY 2: Fallback to App Secrets (Application Flow - Requires Admin Consent)
    const request = {
        scopes: ["https://graph.microsoft.com/.default"],
    };
    const response = await cca.acquireTokenByClientCredential(request);
    return response?.accessToken;
}

export interface LeadData {
    Name: string;
    Email: string;
    Phone: string;
    Year: string;
    Make: string;
    Model: string;
    Part: string;
    Vin: string;
    Message: string;
    Date: string;
}

export async function addLeadToExcel(lead: LeadData) {
    if (!process.env.AZURE_CLIENT_ID) {
        console.error("Missing Azure Credentials");
        throw new Error("Missing Azure Credentials");
    }

    try {
        const accessToken = await getAccessToken();

        if (!accessToken) {
            throw new Error("Failed to acquire Access Token. Please run 'npm run auth' to fix permissions.");
        }

        const client = Client.init({
            authProvider: (done) => {
                done(null, accessToken || "");
            },
        });

        const targetEmail = process.env.TARGET_USER_EMAIL || "sales@nexusautopartsus.com";
        const fileName = process.env.EXCEL_FILE_NAME || "Leads.xlsx";
        const tableName = process.env.EXCEL_TABLE_NAME || "LeadsTable";

        // Construct the row data matching expected columns
        // Columns: Name, Email, Phone, Part Year, Make, Model, Part, VIN Number, Date
        const rowData = [
            [
                lead.Name,
                lead.Email,
                lead.Phone,
                lead.Year,
                lead.Make,
                lead.Model,
                lead.Part,
                lead.Vin,
                lead.Date
            ]
        ];

        // API Endpoint: /users/{id}/drive/root:/{filename}:/workbook/tables/{tablename}/rows
        // We use the UPN (email) for user ID
        const response = await client.api(`/users/${targetEmail}/drive/root:/${fileName}:/workbook/tables/${tableName}/rows`)
            .post({
                values: rowData,
                index: null // Append to end
            });

        return response;
    } catch (error: any) {
        console.error("Error adding lead to Excel:", error);
        throw error;
    }
}

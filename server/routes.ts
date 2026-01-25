import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { addLeadToExcel } from "./services/graphService.js";
import { sendLeadEmails } from "./services/emailService.js";

export async function registerRoutes(app: Express): Promise<void> {

  app.get("/api/config-check", (req, res) => {
    const requiredVars = [
      "AZURE_CLIENT_ID",
      "AZURE_CLIENT_SECRET",
      "AZURE_TENANT_ID",
      "AZURE_REFRESH_TOKEN",
      "TARGET_USER_EMAIL",
      "EXCEL_FILE_NAME",
      "EXCEL_TABLE_NAME"
    ];

    const status = requiredVars.reduce((acc, varName) => {
      acc[varName] = process.env[varName] ? "Present" : "MISSING";
      return acc;
    }, {} as Record<string, string>);

    res.json({
      status: Object.values(status).includes("MISSING") ? "ERROR" : "OK",
      env: status
    });
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const { name, email, phone, year, make, model, vin, part, message } = req.body;

      // Basic validation
      if (!name || !email || !phone) {
        res.status(400).json({ message: "Name, Email and Phone are required" });
        return;
      }

      await addLeadToExcel({
        Name: name,
        Email: email,
        Phone: phone,
        Year: year || "N/A",
        Make: make || "N/A",
        Model: model || "N/A",
        Part: part || "N/A",
        Vin: vin || "N/A",
        Message: message || "N/A",
        Date: new Date().toLocaleString()
      });

      // Send Emails
      await sendLeadEmails({
        name, email, phone, year, make, model, vin, part, message
      });

      res.status(200).json({ success: true, message: "Lead captured successfully" });
    } catch (error: any) {
      console.error("Lead capture error:", error.message);
      // Don't fail the request to the user if backend logging fails, or maybe we should?
      // For now, return 500 so frontend knows it failed, but maybe silent fail is better?
      // Let's return 500 for debugging.
      res.status(500).json({ message: "Failed to save lead", error: error.message });
    }
  });

  // existing routes...
}

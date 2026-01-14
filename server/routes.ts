import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { addLeadToExcel } from "./services/graphService";

export async function registerRoutes(app: Express): Promise<void> {

  app.post("/api/leads", async (req, res) => {
    try {
      const { name, email, phone, vehicle, part, message } = req.body;

      // Basic validation
      if (!name || !email || !phone) {
        res.status(400).json({ message: "Name, Email and Phone are required" });
        return;
      }

      await addLeadToExcel({
        Name: name,
        Email: email,
        Phone: phone,
        Vehicle: vehicle || "N/A",
        Part: part || "N/A",
        Message: message || "N/A",
        Date: new Date().toLocaleString()
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

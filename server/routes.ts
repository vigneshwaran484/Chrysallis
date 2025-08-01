import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { insertRegistrationSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

// Configure multer for file uploads
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  dest: uploadsDir,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Registration endpoint
  app.post("/api/registrations", upload.single('collegeId'), async (req, res) => {
    try {
      // Parse team members if it's a team registration
      let teamMembers = null;
      if (req.body.teamMembers) {
        try {
          teamMembers = JSON.stringify(JSON.parse(req.body.teamMembers));
        } catch (e) {
          teamMembers = req.body.teamMembers;
        }
      }

      // Parse events array
      let events = req.body.events;
      if (typeof events === 'string') {
        try {
          events = JSON.parse(events);
        } catch (e) {
          events = [events];
        }
      }

      const registrationData = {
        ...req.body,
        events,
        teamMembers,
        collegeIdPath: req.file ? req.file.path : undefined
      };

      // Validate the registration data
      const validatedData = insertRegistrationSchema.parse(registrationData);

      // Check if email already exists
      const existingRegistration = await storage.getRegistrationByEmail(validatedData.email);
      if (existingRegistration) {
        return res.status(400).json({ 
          message: "Email already registered. Each email can only register once." 
        });
      }

      // Create the registration
      const registration = await storage.createRegistration(validatedData);
      
      res.status(201).json({
        message: "Registration successful!",
        registrationId: registration.id
      });
    } catch (error) {
      console.error("Registration error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.errors
        });
      }
      
      if (error instanceof multer.MulterError) {
        return res.status(400).json({
          message: error.message
        });
      }
      
      res.status(500).json({
        message: "Internal server error during registration"
      });
    }
  });

  // Get all registrations (for admin purposes)
  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getAllRegistrations();
      res.json(registrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      res.status(500).json({
        message: "Error fetching registrations"
      });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      res.status(201).json({
        message: "Message sent successfully!",
        messageId: message.id
      });
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.errors
        });
      }
      
      res.status(500).json({
        message: "Error sending message"
      });
    }
  });

  // Get all contact messages (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({
        message: "Error fetching contact messages"
      });
    }
  });

  // Get events data
  app.get("/api/events", async (req, res) => {
    try {
      const { events } = await import("@shared/schema");
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({
        message: "Error fetching events"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

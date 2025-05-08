import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertProgressSchema, insertQuizResultSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // API Routes
  // All routes are prefixed with /api

  // Users API
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.put("/api/users/:id/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const progressData = req.body;
      const user = await storage.updateUserProgress(userId, progressData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Failed to update progress" });
    }
  });

  // Modules API
  app.get("/api/modules", async (req, res) => {
    try {
      const type = req.query.type as string | undefined;
      let modules;
      
      if (type) {
        modules = await storage.getModulesByType(type);
      } else {
        modules = await storage.getModules();
      }
      
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch modules" });
    }
  });

  app.get("/api/modules/:id", async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      const module = await storage.getModule(moduleId);
      
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      res.json(module);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch module" });
    }
  });

  // Quiz API
  app.get("/api/modules/:id/quiz", async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      const questions = await storage.getQuizQuestions(moduleId);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz questions" });
    }
  });

  app.post("/api/quiz/results", async (req, res) => {
    try {
      const resultData = insertQuizResultSchema.parse(req.body);
      const result = await storage.saveQuizResult(resultData);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: "Invalid quiz result data" });
    }
  });

  app.get("/api/users/:userId/quiz/results", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const moduleId = req.query.moduleId ? parseInt(req.query.moduleId as string) : undefined;
      const results = await storage.getQuizResults(userId, moduleId);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz results" });
    }
  });

  // Glossary API
  app.get("/api/glossary", async (req, res) => {
    try {
      const terms = await storage.getGlossaryTerms();
      res.json(terms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch glossary terms" });
    }
  });

  app.get("/api/glossary/:id", async (req, res) => {
    try {
      const termId = parseInt(req.params.id);
      const term = await storage.getGlossaryTerm(termId);
      
      if (!term) {
        return res.status(404).json({ message: "Term not found" });
      }
      
      res.json(term);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch glossary term" });
    }
  });

  // Printer parts API
  app.get("/api/printer-parts", async (req, res) => {
    try {
      const parts = await storage.getPrinterParts();
      res.json(parts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch printer parts" });
    }
  });

  app.get("/api/printer-parts/:id", async (req, res) => {
    try {
      const partId = parseInt(req.params.id);
      const part = await storage.getPrinterPart(partId);
      
      if (!part) {
        return res.status(404).json({ message: "Printer part not found" });
      }
      
      res.json(part);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch printer part" });
    }
  });

  // Materials API
  app.get("/api/materials", async (req, res) => {
    try {
      const materials = await storage.getMaterials();
      res.json(materials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch materials" });
    }
  });

  app.get("/api/materials/:id", async (req, res) => {
    try {
      const materialId = parseInt(req.params.id);
      const material = await storage.getMaterial(materialId);
      
      if (!material) {
        return res.status(404).json({ message: "Material not found" });
      }
      
      res.json(material);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch material" });
    }
  });

  // Progress tracking API
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  app.get("/api/users/:userId/overall-progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const overallProgress = await storage.getOverallProgress(userId);
      res.json({ progress: overallProgress });
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate overall progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const progressData = insertProgressSchema.parse(req.body);
      const progress = await storage.updateProgress(progressData);
      res.status(201).json(progress);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress data" });
    }
  });

  return httpServer;
}

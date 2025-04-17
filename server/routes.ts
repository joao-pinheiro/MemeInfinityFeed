import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { upvoteSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Get memes with pagination
  app.get("/api/memes", async (req, res) => {
    try {
      const pageParam = req.query.page;
      const limitParam = req.query.limit;
      
      const page = pageParam ? parseInt(pageParam as string, 10) : 1;
      const limit = limitParam ? parseInt(limitParam as string, 10) : 10;
      
      if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        return res.status(400).json({ message: "Invalid page or limit parameters" });
      }
      
      const memes = await storage.getMemes(page, limit);
      const total = await storage.getTotalMemes();
      
      res.json({
        memes,
        pagination: {
          page,
          limit,
          total,
          hasMore: page * limit < total
        }
      });
    } catch (error) {
      console.error("Error fetching memes:", error);
      res.status(500).json({ message: "Failed to fetch memes" });
    }
  });
  
  // Get a single meme by ID
  app.get("/api/memes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid meme ID" });
      }
      
      const meme = await storage.getMeme(id);
      
      if (!meme) {
        return res.status(404).json({ message: "Meme not found" });
      }
      
      res.json(meme);
    } catch (error) {
      console.error("Error fetching meme:", error);
      res.status(500).json({ message: "Failed to fetch meme" });
    }
  });
  
  // Upvote a meme
  app.post("/api/memes/upvote", async (req, res) => {
    try {
      const result = upvoteSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid request body", errors: result.error.format() });
      }
      
      const { memeId } = result.data;
      const updatedMeme = await storage.upvoteMeme(memeId);
      
      if (!updatedMeme) {
        return res.status(404).json({ message: "Meme not found" });
      }
      
      res.json(updatedMeme);
    } catch (error) {
      console.error("Error upvoting meme:", error);
      res.status(500).json({ message: "Failed to upvote meme" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Meme schema
export const memes = pgTable("memes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  source: text("source").notNull(),
  mediaUrl: text("media_url").notNull(),
  mediaType: text("media_type").notNull(), // "image" or "video"
  upvotes: integer("upvotes").default(0).notNull(),
  comments: integer("comments").default(0).notNull(),
  text: text("text"), // Optional text content
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMemeSchema = createInsertSchema(memes).omit({
  id: true,
  upvotes: true, 
  comments: true,
  createdAt: true
});

// For upvoting a meme
export const upvoteSchema = z.object({
  memeId: z.number()
});

export type InsertMeme = z.infer<typeof insertMemeSchema>;
export type Meme = typeof memes.$inferSelect;
export type UpvoteRequest = z.infer<typeof upvoteSchema>;

import { memes, users, type User, type InsertUser, type Meme, type InsertMeme } from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

// Interface to define storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Meme related methods
  getMemes(page: number, limit: number): Promise<Meme[]>;
  getMeme(id: number): Promise<Meme | undefined>;
  createMeme(meme: InsertMeme): Promise<Meme>;
  upvoteMeme(id: number): Promise<Meme | undefined>;
  getTotalMemes(): Promise<number>;
}

// Database implementation of storage
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Meme methods
  async getMemes(page: number = 1, limit: number = 10): Promise<Meme[]> {
    const offset = (page - 1) * limit;
    return await db.select()
      .from(memes)
      .orderBy(desc(memes.createdAt))
      .limit(limit)
      .offset(offset);
  }
  
  async getMeme(id: number): Promise<Meme | undefined> {
    const [meme] = await db.select().from(memes).where(eq(memes.id, id));
    return meme;
  }
  
  async createMeme(insertMeme: InsertMeme): Promise<Meme> {
    // Set defaults for meme creation
    const memeWithDefaults = {
      ...insertMeme,
      upvotes: 0,
      comments: 0
    };
    
    const [meme] = await db.insert(memes).values(memeWithDefaults).returning();
    return meme;
  }
  
  async upvoteMeme(id: number): Promise<Meme | undefined> {
    const [meme] = await db
      .update(memes)
      .set({ upvotes: sql`${memes.upvotes} + 1` })
      .where(eq(memes.id, id))
      .returning();
    
    return meme;
  }
  
  async getTotalMemes(): Promise<number> {
    const result = await db.select({ count: sql`count(*)` }).from(memes);
    return Number(result[0].count);
  }
  
  // Method to seed initial data if needed
  async seedInitialData(): Promise<void> {
    const count = await this.getTotalMemes();
    
    // Only seed if there are no memes in the database
    if (count === 0) {
      const sampleMemes: InsertMeme[] = [
        {
          title: "When the bug that took you 3 days to fix was just a typo",
          source: "r/ProgrammerHumor",
          mediaUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&h=800&fit=crop",
          mediaType: "image"
        },
        {
          title: "My dog's reaction to the new toy",
          source: "r/ContagiousLaughter",
          mediaUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&h=800&fit=crop",
          mediaType: "video"
        },
        {
          title: "Why did the scarecrow win an award?",
          source: "r/DadJokes",
          mediaUrl: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=800&h=800&fit=crop",
          mediaType: "image",
          text: "Because he was outstanding in his field!"
        },
        {
          title: "When someone says they made cookies",
          source: "r/ReactionGifs",
          mediaUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=800&fit=crop",
          mediaType: "image"
        },
        {
          title: "Wait for it...",
          source: "r/Unexpected",
          mediaUrl: "https://images.unsplash.com/photo-1597953601374-1ff2d5640c85?w=800&h=800&fit=crop",
          mediaType: "video"
        },
        {
          title: "Every time I try to eat healthy",
          source: "r/AdviceAnimals",
          mediaUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&h=800&fit=crop",
          mediaType: "image"
        },
        {
          title: "Code works in development but fails in production",
          source: "r/ProgrammerHumor",
          mediaUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=800&fit=crop",
          mediaType: "image"
        },
        {
          title: "When the project manager adds 'one small feature'",
          source: "r/ProgrammerHumor",
          mediaUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=800&fit=crop",
          mediaType: "image"
        },
        {
          title: "Cats when you're trying to work",
          source: "r/CatMemes",
          mediaUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=800&fit=crop",
          mediaType: "image"
        },
        {
          title: "When you finally solve that problem",
          source: "r/ReactionGifs",
          mediaUrl: "https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=800&h=800&fit=crop",
          mediaType: "video"
        }
      ];
      
      // Insert sample memes in batches
      for (const meme of sampleMemes) {
        await this.createMeme(meme);
      }
    }
  }
}

// Export a single instance of the storage service
export const storage = new DatabaseStorage();

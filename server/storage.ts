import { memes, users, type User, type InsertUser, type Meme, type InsertMeme } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private memeStore: Map<number, Meme>;
  userCurrentId: number;
  memeCurrentId: number;

  constructor() {
    this.users = new Map();
    this.memeStore = new Map();
    this.userCurrentId = 1;
    this.memeCurrentId = 1;
    
    // Initialize with some sample memes
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
    
    // Add sample memes to storage
    sampleMemes.forEach(meme => this.createMeme(meme));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Meme Methods
  async getMemes(page: number = 1, limit: number = 10): Promise<Meme[]> {
    const memes = Array.from(this.memeStore.values());
    const startIndex = (page - 1) * limit;
    return memes
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(startIndex, startIndex + limit);
  }
  
  async getMeme(id: number): Promise<Meme | undefined> {
    return this.memeStore.get(id);
  }
  
  async createMeme(insertMeme: InsertMeme): Promise<Meme> {
    const id = this.memeCurrentId++;
    const now = new Date();
    const meme: Meme = { 
      ...insertMeme, 
      id, 
      upvotes: 0, 
      comments: Math.floor(Math.random() * 200), // Random number of comments for demo purposes
      createdAt: now
    };
    this.memeStore.set(id, meme);
    return meme;
  }
  
  async upvoteMeme(id: number): Promise<Meme | undefined> {
    const meme = this.memeStore.get(id);
    if (!meme) return undefined;
    
    const updatedMeme: Meme = {
      ...meme,
      upvotes: meme.upvotes + 1
    };
    
    this.memeStore.set(id, updatedMeme);
    return updatedMeme;
  }
  
  async getTotalMemes(): Promise<number> {
    return this.memeStore.size;
  }
}

export const storage = new MemStorage();

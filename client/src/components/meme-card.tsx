import React, { useState } from "react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, Share } from "lucide-react";
import { type Meme } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { formatDistanceToNow } from "date-fns";

interface MemeCardProps {
  meme: Meme;
}

export function MemeCard({ meme }: MemeCardProps) {
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [localUpvotes, setLocalUpvotes] = useState(meme.upvotes);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const formatUpvotes = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };
  
  const formatTime = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };
  
  const handleUpvote = async () => {
    if (isUpvoting) return;
    
    setIsUpvoting(true);
    setIsAnimating(true);
    
    setLocalUpvotes(prevCount => prevCount + 1);
    
    try {
      await apiRequest("POST", "/api/memes/upvote", { memeId: meme.id });
      queryClient.invalidateQueries({ queryKey: ["/api/memes"] });
    } catch (error) {
      setLocalUpvotes(meme.upvotes);
      console.error("Failed to upvote:", error);
    } finally {
      setIsUpvoting(false);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };
  
  return (
    <Card className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg">
      <CardHeader className="p-3 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between space-y-0">
        <div className="text-sm text-neutral-600 dark:text-neutral-400">{meme.source}</div>
        <div className="text-xs text-neutral-500 dark:text-neutral-500">
          {formatTime(meme.createdAt)}
        </div>
      </CardHeader>
      
      <div className={meme.mediaType === "image" ? "image-container" : "video-container"}>
        {meme.mediaType === "image" ? (
          <img 
            src={meme.mediaUrl} 
            alt={meme.source || "Meme image"}
            className="transition-opacity duration-300"
            loading="lazy"
          />
        ) : (
          <video 
            controls 
            className="transition-opacity duration-300"
            preload="metadata"
            poster={meme.mediaUrl}
          >
            <source src={meme.mediaUrl} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        )}
      </div>
      
      <CardFooter className="p-3 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUpvote}
          disabled={isUpvoting}
          className="group flex items-center space-x-1 mr-4 p-0"
        >
          <ArrowUp 
            className={`h-5 w-5 ${isAnimating ? 'text-primary upvote-animate' : 'group-hover:text-primary transition-colors'}`} 
          />
          <span className="font-medium">{formatUpvotes(localUpvotes)}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="ml-auto text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 p-0"
        >
          <Share className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}

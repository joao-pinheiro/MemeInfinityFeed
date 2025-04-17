import React from "react";
import { MemeCard } from "@/components/meme-card";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function MemeContainer() {
  const { memes, isLoading, isFetchingMore, error, hasMore } = useInfiniteScroll();
  
  if (isLoading) {
    return <SkeletonLoader />;
  }
  
  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load memes. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="meme-container">
        {memes.map(meme => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
      
      {isFetchingMore && <LoadingSpinner />}
      
      {!hasMore && memes.length > 0 && (
        <div className="text-center py-10 text-neutral-600 dark:text-neutral-400">
          You've reached the end! No more memes to load.
        </div>
      )}
      
      {memes.length === 0 && (
        <div className="text-center py-10 text-neutral-600 dark:text-neutral-400">
          No memes found. Check back later!
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Meme } from "@shared/schema";

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

interface MemesResponse {
  memes: Meme[];
  pagination: PaginationInfo;
}

export function useInfiniteScroll() {
  const [page, setPage] = useState(1);
  const [allMemes, setAllMemes] = useState<Meme[]>([]);
  const [hasMore, setHasMore] = useState(true);
  
  const {
    data,
    isLoading,
    isFetching,
    error
  } = useQuery<MemesResponse>({
    queryKey: ["/api/memes", page],
    keepPreviousData: true,
  });
  
  useEffect(() => {
    if (data) {
      if (page === 1) {
        setAllMemes(data.memes);
      } else {
        // Append new memes to existing ones
        setAllMemes(prev => [...prev, ...data.memes]);
      }
      setHasMore(data.pagination.hasMore);
    }
  }, [data, page]);
  
  const loadMore = () => {
    if (!isFetching && hasMore) {
      setPage(prev => prev + 1);
    }
  };
  
  const handleScroll = () => {
    // Check if we're near the bottom of the page
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 200 && !isFetching && hasMore) {
      loadMore();
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, hasMore]);
  
  return {
    memes: allMemes,
    isLoading: isLoading || (isFetching && page === 1),
    isFetchingMore: isFetching && page > 1,
    error,
    hasMore
  };
}

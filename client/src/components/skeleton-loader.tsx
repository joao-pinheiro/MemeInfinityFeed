import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <Card className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
      <CardHeader className="p-3 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between space-y-0">
        <Skeleton className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded" />
        <Skeleton className="h-3 w-16 bg-neutral-200 dark:bg-neutral-700 rounded" />
      </CardHeader>
      
      <div className="p-3">
        <Skeleton className="h-5 w-full bg-neutral-200 dark:bg-neutral-700 rounded mb-2" />
      </div>
      
      <Skeleton className="aspect-square bg-neutral-200 dark:bg-neutral-700" />
      
      <CardFooter className="p-3 flex items-center">
        <Skeleton className="h-6 w-16 bg-neutral-200 dark:bg-neutral-700 rounded mr-4" />
        <Skeleton className="h-6 w-16 bg-neutral-200 dark:bg-neutral-700 rounded" />
      </CardFooter>
    </Card>
  );
}

export function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

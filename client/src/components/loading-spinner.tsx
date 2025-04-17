import React from "react";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-10" id="loading-indicator">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-neutral-200 dark:border-neutral-800 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading more memes...</p>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";

export function useInfiniteScroll({ onLoadMore, hasMore, loading }) {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleScroll = useCallback(async () => {
    if (loading || loadingMore || !hasMore) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;

    // Load more when user scrolls to bottom (with 100px threshold)
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setLoadingMore(true);
      try {
        await onLoadMore();
      } finally {
        setLoadingMore(false);
      }
    }
  }, [loading, loadingMore, hasMore, onLoadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { loadingMore };
}

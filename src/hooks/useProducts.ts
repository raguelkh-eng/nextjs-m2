"use client";

import useSWR from "swr";
import type { Product } from "@/lib/types";

export const PRODUCTS_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

/** Custom error with extra debugging context. */
export class FetchError extends Error {
  status?: number;
  info?: unknown;

  constructor(message: string) {
    super(message);
    this.name = "FetchError";
  }
}

/**
 * Generic JSON fetcher used by useSWR.
 * Reads the response as JSON and throws on non-2xx responses so that
 * SWR surfaces the error through `error`.
 */
export const fetcher = (url: string): Promise<Product[]> =>
  fetch(url).then(async (res) => {
    if (!res.ok) {
      const error = new FetchError(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
      error.status = res.status;
      error.info = await res.json().catch(() => ({}));
      throw error;
    }
    return res.json() as Promise<Product[]>;
  });

/**
 * Fetches the list of products from the FakeStoreAPI using SWR.
 *
 * SWR automatically caches, deduplicates and revalidates the request:
 *  - stale-while-revalidate on focus / mount
 *  - automatic retries on failure
 */
export function useProducts() {
  const {
    data: products,
    error,
    isValidating,
    isLoading,
  } = useSWR<Product[], FetchError>(PRODUCTS_API_URL, fetcher, {
    // Keep showing cached data while revalidating in the background.
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    // Retry a failing request a few times before giving up.
    errorRetryCount: 3,
    errorRetryInterval: 1000,
    // Don't spam the API on every mount during dev hot-reloads.
    dedupingInterval: 2_000,
  });

  return {
    products,
    isLoading: isLoading || (!error && !products && isValidating),
    isError: error,
    isRefreshing: isValidating && !!products,
    error,
  };
}

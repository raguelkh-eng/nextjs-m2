"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function DataFetchContent() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const products: Product[] = await response.json();
        setData(products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Products - Data Fetch Page</h1>

      {error && <p className="text-destructive mb-4">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={`skeleton-${i}`} className="h-96 w-full" />
            ))
          : data.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 w-full object-contain mb-4"
                />
                <h2 className="font-bold text-lg mb-2 line-clamp-1">
                  {product.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${product.price}</span>
                  <span className="text-sm bg-secondary px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
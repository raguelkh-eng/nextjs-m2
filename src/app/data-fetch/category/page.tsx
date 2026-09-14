"use client";

import type { Metadata } from "next";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "M2 - Product Categories",
  description: "Browse product categories fetched from the M2 API",
  openGraph: {
    title: "M2 - Product Categories",
    description: "Browse product categories fetched from the M2 API",
    images: ["/M2.jpg"],
  },
};

type Category = string;

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/categories`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`);
        }

        const data: Category[] = await response.json();
        setCategories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <section className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Product Categories</h1>

      {error && (
        <p className="text-destructive mb-4">
          {error}
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={`category-skeleton-${i}`} className="h-20 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
            >
              <span className="font-medium text-lg capitalize">
                {category}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
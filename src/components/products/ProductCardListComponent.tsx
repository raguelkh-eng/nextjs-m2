"use client"

import { useEffect, useState } from "react"
import EcommerceProductCard from "./ProductCardComponent";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

export default function ProductCardListComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }
        const productsData = await response.json();
        setProducts(productsData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Loading skeleton component
  if (loading) {
    return (
      <section className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 justify-center mx-auto">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={`skeleton-${index}`} className="w-80 h-96 rounded-2xl" />
        ))}
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="container p-4 mx-auto text-center">
        <p className="text-destructive mb-2">Failed to load products</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 justify-center mx-auto">
      {products?.map(({image, title, description, price, id}) => (
        <Link key={id} href={`/product/${id}`}>
          <EcommerceProductCard 
            image={image} 
            title={title} 
            description={description} 
            price={price}
          />
        </Link>
      ))}
    </section>
  );
}

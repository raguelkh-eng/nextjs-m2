"use client";

import { Star, StarHalf, RefreshCw, AlertCircle, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/lib/types";

const MAX_STARS = 5;

/** Format a price as USD currency. */
function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

/** Render a fractional star rating (full + half + empty). */
function RatingStars({ rate }: { rate: number }) {
  const full = Math.floor(rate);
  const hasHalf = rate - full >= 0.25 && rate - full <= 0.75;
  const empty = MAX_STARS - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`full-${i}`} className="h-3.5 w-3.5 fill-current" />
      ))}
      {hasHalf && <StarHalf className="h-3.5 w-3.5 fill-current" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-3.5 w-3.5" />
      ))}
      <span
        className="ml-1.5 text-xs text-muted-foreground"
        suppressHydrationWarning
      >
        {rate.toFixed(1)}
      </span>
    </div>
  );
}


/** Single row rendered once a product has loaded. */
function ProductRow({ 
  product, 
  isSelected, 
  onSelect 
}: { 
  product: Product; 
  isSelected: boolean; 
  onSelect: (id: number, selected: boolean) => void;
}) {
  return (
    <TableRow>
      <TableCell className="pr-0">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelect(product.id, checked as boolean)}
          aria-label={`Select product ${product.id}`}
        />
      </TableCell>

      <TableCell className="font-mono text-xs text-muted-foreground">
        #{product.id}
      </TableCell>

      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <div className="relative isolated h-10 w-10 shrink-0 overflow-hidden rounded-md border">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="40px"
              className="object-contain p-1"
            />
          </div>
          <span className="line-clamp-1 max-w-[220px]">{product.title}</span>
        </div>
      </TableCell>

      <TableCell>
        <Badge variant="secondary" className="capitalize">
          {product.category}
        </Badge>
      </TableCell>

      <TableCell className="text-right font-medium">
        {formatPrice(product.price)}
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-1.5">
          <RatingStars rate={product.rating?.rate ?? 0} />
          <span className="text-xs text-muted-foreground">
            ({product.rating?.count ?? 0})
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
}

/** Skeleton loader shown while the products are being fetched. */
function ProductTableSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 8 }).map((_, rowIndex) => (
        <TableRow key={`skeleton-${rowIndex}`} className="animate-pulse">
          <TableCell className="pr-0">
            <div className="h-4 w-4 rounded bg-muted" />
          </TableCell>
          <TableCell>
            <div className="h-6 w-10 rounded bg-muted" />
          </TableCell>
          <TableCell>
            <div className="h-4 w-10 rounded bg-muted mb-1" />
            <div className="h-4 w-8/12 rounded bg-muted" />
          </TableCell>
          <TableCell>
            <div className="h-4 w-20 rounded bg-muted" />
          </TableCell>
          <TableCell>
            <div className="h-4 w-16 rounded bg-muted" />
          </TableCell>
          <TableCell>
            <div className="h-4 w-24 rounded bg-muted" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default function ProductDataTable() {
  const { products, isLoading, isError, error } = useProducts();
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectProduct = (id: number, selected: boolean) => {
    const newSelected = new Set(selectedProducts);
    if (selected) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedProducts(newSelected);
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allProductIds = new Set(filteredProducts.map(p => p.id));
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts(new Set());
    }
  };

  const filteredProducts = products
    ? products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const isAllSelected = filteredProducts.length > 0 && 
    filteredProducts.every(p => selectedProducts.has(p.id));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <p className="text-sm text-muted-foreground">
          {isLoading
            ? "Loading products…"
            : isError
              ? "Failed to load products"
              : `${products?.length ?? 0} products fetched`}
        </p>
      </CardHeader>

      <CardContent>
        {/* ── Search and Selection ───────────────────── */}
        {!isError && (
          <div className="mb-4 flex items-center justify-between">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            {selectedProducts.size > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProducts(new Set())}
              >
                Clear Selection ({selectedProducts.size})
              </Button>
            )}
          </div>
        )}

        {/* ── Error state ────────────────────────── */}
        {isError && (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <div>
              <p className="font-medium text-destructive">
                Something went wrong
              </p>
              <p className="text-sm text-muted-foreground">
                {error?.message ?? "Could not fetch products from the API."}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </div>
        )}

        {/* ── Table ──────────────────────────────── */}
        {!isError && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pr-0">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                      aria-label="Select all products"
                      disabled={filteredProducts.length === 0}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>

              {isLoading ? (
                <ProductTableSkeleton />
              ) : (
                <TableBody>
                  {filteredProducts.map((product) => (
                    <ProductRow 
                      key={product.id} 
                      product={product} 
                      isSelected={selectedProducts.has(product.id)}
                      onSelect={handleSelectProduct}
                    />
                  ))}
                </TableBody>
              )}
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}



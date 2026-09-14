"use client";

import type { Metadata } from "next";
import Link from "next/link";
import ProductDataTable from "@/components/products/ProductDataTable";

export const metadata: Metadata = {
  title: "M2 - Data Table",
  description: "Interactive product data table with sorting and filtering powered by SWR",
  openGraph: {
    title: "M2 - Data Table",
    description: "Interactive product data table with sorting and filtering powered by SWR",
    images: ["/M2.jpg"],
  },
};

export default function DataTablePage() {
  return (
    <section className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Data Table</h1>
        <Link
          href="/product"
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          ← Back to products
        </Link>
      </div>

      <ProductDataTable />
    </section>
  );
}

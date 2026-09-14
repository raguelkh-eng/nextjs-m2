import type { Metadata } from "next";
import CategoryContent from "@/components/data-fetch/CategoryContent";

export const metadata: Metadata = {
  title: "M2 - Product Categories",
  description: "Browse product categories fetched from the M2 API",
  openGraph: {
    title: "M2 - Product Categories",
    description: "Browse product categories fetched from the M2 API",
    images: ["/M2.jpg"],
  },
};

export default function CategoryPage() {
    return <CategoryContent />;
}
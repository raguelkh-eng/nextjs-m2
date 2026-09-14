import type { Metadata } from "next";
import DataFetchContent from "@/components/data-fetch/DataFetchContent";

export const metadata: Metadata = {
  title: "M2 - Data Fetching",
  description: "Learn how to fetch product data in Next.js with useEffect and SWR at M2",
  openGraph: {
    title: "M2 - Data Fetching",
    description: "Learn how to fetch product data in Next.js with useEffect and SWR at M2",
    images: ["/M2.jpg"],
  },
};

export default function DataFetchPage() {
    return <DataFetchContent />;
}
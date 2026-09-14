import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailComponent } from "@/components/products/ProductDetailComponent";

export const metadata: Metadata = {
  title: "M2 - Product Details",
  description: "Detailed view of the selected product from M2",
  openGraph: {
    title: "M2 - Product Details",
    description: "Detailed view of the selected product from M2",
    images: ["/M2.jpg"],
  },
};

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params;

  // The catch-all route [...]slug produces an array; extract the product ID
  const productId = slug?.[0];

  if (!productId) {
    notFound();
  }

  return (
    <div>
      <ProductDetailComponent id={productId} />
    </div>
  )
}

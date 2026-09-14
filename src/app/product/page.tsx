import type { Metadata } from "next";
import ProductCardListComponent from "@/components/products/ProductCardListComponent";

export const metadata: Metadata = {
  title: "M2 - Products",
  description: "Shop our collection of high-quality products at M2",
  openGraph: {
    title: "M2 - Products",
    description: "Shop our collection of high-quality products at M2",
    images: ["/M2.jpg"],
  },
};


export default function PrductPage() {
  return (
    
     <ProductCardListComponent/>
    
  )
}

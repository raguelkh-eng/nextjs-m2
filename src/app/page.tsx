import { CardDemo } from "@/components/cards/CardDemoComponent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "M2 - Homepage",
  description: "M2 is your one-stop ecommerce platform for high-quality skirts, trousers, and kids' clothing. Modern shopping for Cambodian people.",
  openGraph: {
    title: "M2 - Homepage",
    description: "M2 is your one-stop ecommerce platform for high-quality skirts, trousers, and kids' clothing.",
    images: ["/M2.jpg"],
  },
};

export default function Home() {
  return (
   <section>
    សួស្តីប្អូនៗទាំងអស់គ្នា
    <h2> hello Cambodia</h2>

    {/* using button from shadcn ui */}
    <Button className={'bg-red-500'}>Button</Button>

    {/* calling card component */}
     <CardDemo/>

      {/* Link to the SWR-powered data table page */}
      <Link
        href="/data-table"
        className="inline-block mt-4 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        View Products Data Table →
      </Link>
     
   </section>
  );
}

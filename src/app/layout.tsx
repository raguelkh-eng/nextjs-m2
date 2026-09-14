import type { Metadata } from "next";
import {Geist_Mono, Kantumruy_Pro, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";


const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const kantumruy = Kantumruy_Pro({
  variable: '--font-kantumruy-pro',
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | M2',
    default: 'M2'
  },
  keywords: 'Skirt for Woman, Trousers for man, kid clothes, E-commerce, products, selling product',
  description: "M2 is the best platform for selling products in ecommerce modern website for Cambodian People.",
  openGraph: {
    title: 'M2',
    description: 'M2 is the best platform for selling producst in ecommerce modern website for Cambodian people.',
    images:['/M2.jpg'],
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", kantumruy.variable, geistMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
    
       <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        
        </body>
    </html>
  );
}

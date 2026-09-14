


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "M2 - Dashboard",
  description: "M2 dashboard - manage products, orders, and analytics",
  openGraph: {
    title: "M2 - Dashboard",
    description: "M2 dashboard - manage products, orders, and analytics",
    images: ["/M2.jpg"],
  },
};

export default function DashboardPage() {
  return (
    <div>
      Dashboard Page
    </div>
  )
}

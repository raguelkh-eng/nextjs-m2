import AnimatedListDemo from "@/components/shadcn-space/animated-list/animated-list-01";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "M2 - About Us",
  description: "Learn about the M2 team, our members, and everything about our mission to bring quality clothing to Cambodian people.",
  openGraph: {
    title: "M2 - About Us",
    description: "Learn about the M2 team, our members, and everything about our mission.",
    images: ["/M2.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div className="text-red-500">
      ស្វាគមន៍មកកាន់មេរៀន ណិច Welcome To About Page ❤️
      <AnimatedListDemo/>

    </div>
  )
}

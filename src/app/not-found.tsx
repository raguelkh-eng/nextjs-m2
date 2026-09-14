
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "M2 - Page Not Found",
  description: "The page you are looking for does not exist on M2",
  openGraph: {
    title: "M2 - Page Not Found",
    description: "The page you are looking for does not exist on M2",
    images: ["/M2.jpg"],
  },
};

export default function NotFoundPage() {
  return (
    <div>
    404- Not Found Page 🫵
    </div>
  )
}

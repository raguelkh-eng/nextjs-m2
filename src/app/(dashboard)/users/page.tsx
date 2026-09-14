
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "M2 - Users",
  description: "M2 dashboard - manage user accounts and details",
  openGraph: {
    title: "M2 - Users",
    description: "M2 dashboard - manage user accounts and details",
    images: ["/M2.jpg"],
  },
};

export default function UserPage() {
  return (
    <div>
      User page in Dashboard
    </div>
  )
}

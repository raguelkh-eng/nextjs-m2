import type { Metadata } from "next"
import RegisterContent from "@/components/auth/RegisterContent"

export const metadata: Metadata = {
  title: "M2 - Register",
  description: "Create a new M2 account to start shopping and managing your orders",
  openGraph: {
    title: "M2 - Register",
    description: "Create a new M2 account to start shopping and managing your orders",
    images: ["/M2.jpg"],
  },
}

export default function RegisterPage() {
  return <RegisterContent />
}

import type { Metadata } from "next"
import { LoginFormComponent } from "@/components/auth/LoginFormComponent"

export const metadata: Metadata = {
  title: "M2 - Login",
  description: "Sign in to your M2 account to access exclusive features and manage your orders",
  openGraph: {
    title: "M2 - Login",
    description: "Sign in to your M2 account to access exclusive features and manage your orders",
    images: ["/M2.jpg"],
  },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <LoginFormComponent />
    </div>
  )
}
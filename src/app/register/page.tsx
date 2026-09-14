"use client"

import type { Metadata } from "next";
import Link from "next/link"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast, Toaster } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export const metadata: Metadata = {
  title: "M2 - Register",
  description: "Create a new M2 account to start shopping and managing your orders",
  openGraph: {
    title: "M2 - Register",
    description: "Create a new M2 account to start shopping and managing your orders",
    images: ["/M2.jpg"],
  },
};

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must not exceed 128 characters" })
    .regex(/[A-Z]/, { message: "At least 1 uppercase letter" })
    .regex(/[a-z]/, { message: "At least 1 lowercase letter" })
    .regex(/[0-9]/, { message: "At least 1 number" }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FAKESTORE_PLAZI_API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          avatar: "https://api.lorem.space/image/placeholder",
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        throw new Error(errorData?.message || "Registration failed. Please try again.")
      }

      const result = await res.json()
      console.log("Registration successful:", result)
      toast.success("Registration successful!")
      router.push("/login")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during registration")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Toaster/>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" autoComplete="name" disabled={isSubmitting} {...register("name")} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" autoComplete="email" disabled={isSubmitting} {...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="new-password" disabled={isSubmitting} className="pr-10" {...register("password")} />
                <button type="button" tabIndex={0} className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground focus:outline-none" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
              {errors.password && <ul className="text-sm text-destructive space-y-1"><li>{errors.password.message}</li></ul>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" autoComplete="new-password" disabled={isSubmitting} className="pr-10" {...register("confirmPassword")} />
                <button type="button" tabIndex={0} className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground focus:outline-none" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label={showConfirmPassword ? "Hide password" : "Show password"}>{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
              {errors.confirmPassword ? <p className="text-sm text-destructive">{errors.confirmPassword.message}</p> : <ul className="text-xs text-muted-foreground space-y-1"><li>Minimum 8 characters</li><li>At least 1 uppercase letter</li><li>At least 1 lowercase letter</li><li>At least 1 number</li></ul>}
            </div>

            {error && <p className="text-sm text-destructive text-center">{error}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            Already have an account? <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

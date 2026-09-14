"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast, Toaster } from "sonner"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff } from "lucide-react"

// zod validation - login only needs a valid email and a non-empty password
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export function LoginFormComponent() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FAKESTORE_PLAZI_API}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      if (res.ok) {
        const result = await res.json()
        if (result.access_token) {
          localStorage.setItem("accessToken", result.access_token)
        }
        toast.success("Login successful!")
        setTimeout(() => {
          router.push("/product")
        }, 1500)
      } else {
        const errorData = await res.json().catch(() => null)
        toast.error(errorData?.message || "Incorrect email or password")
      }
    } catch (error) {
      toast.error("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <Toaster />
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              disabled={isSubmitting}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isSubmitting}
                className="pr-10"
                {...register("password")}
              />
              <button
                type="button"
                tabIndex={0}
                className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <div className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Create an account
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

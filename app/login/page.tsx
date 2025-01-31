"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Code2, Loader2, Mail, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import { toast } from "react-hot-toast"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isEmailUnconfirmed, setIsEmailUnconfirmed] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsEmailUnconfirmed(false)
    try {
      const { data, error } = await login(email, password)
      if (error) {
        if (error.message === "Email not confirmed") {
          setIsEmailUnconfirmed(true)
          toast.error("Please confirm your email address before logging in.")
        } else {
          throw error
        }
      } else {
        toast.success("Login successful!")
        router.push("/")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Failed to log in. Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resendConfirmationEmail = async () => {
    try {
      // Implement the resend confirmation email logic here
      // This will depend on your Supabase setup
      // For example:
      // await supabase.auth.resend({
      //   type: 'signup',
      //   email: email
      // })
      toast.success("Confirmation email resent. Please check your inbox.")
    } catch (error) {
      console.error("Error resending confirmation email:", error)
      toast.error("Failed to resend confirmation email. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <Link
            href="/onboarding"
            className="w-10 h-10 bg-zinc-900/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-zinc-900/70 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
            <Code2 className="w-5 h-5 text-black" />
          </div>
          <div className="w-10 h-10" /> {/* Spacer for centering */}
        </header>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-white/70">Log in to continue learning</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm text-white/70">Email</label>
              <Input
                type="email"
                required
                className="bg-zinc-900/50 border-white/10 text-white placeholder:text-white/30"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm text-white/70">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  className="bg-zinc-900/50 border-white/10 text-white placeholder:text-white/30 pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/50 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link href="/forgot-password" className="text-sm text-yellow-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:opacity-90"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log In"}
            </Button>
            {isEmailUnconfirmed && (
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                <p className="text-sm text-yellow-500 mb-2">
                  Your email is not confirmed. Please check your inbox for the confirmation email.
                </p>
                <Button
                  onClick={resendConfirmationEmail}
                  className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
                >
                  Resend Confirmation Email
                </Button>
              </div>
            )}
          </form>

          <div className="relative flex items-center gap-3 my-8">
            <div className="flex-1 border-t border-white/10" />
            <span className="text-white/30 text-sm">or continue with</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          <Button
            variant="outline"
            className="w-full bg-zinc-900/50 border-white/10 text-white hover:bg-zinc-900/70"
            onClick={() => {
              // Implement Google authentication here
              console.log("Google authentication not implemented yet")
            }}
          >
            <Mail className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>

          <p className="text-center mt-8 text-white/50 text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-yellow-500 hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}


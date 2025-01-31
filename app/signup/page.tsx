"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Code2, Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext"
import { toast } from "react-hot-toast"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data, error } = await signup(email, password)
      if (error) throw error
      toast.success("Sign up successful! Please check your email to verify your account.")
      router.push("/login")
    } catch (error) {
      console.error("Sign up error:", error)
      toast.error("Failed to sign up. Please try again.")
    } finally {
      setIsLoading(false)
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
            <h1 className="text-2xl font-bold mb-2">Create an Account</h1>
            <p className="text-white/70">Join ReelCode and start learning</p>
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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:opacity-90"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up"}
            </Button>
          </form>

          <p className="text-center mt-8 text-white/50 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-500 hover:underline">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}


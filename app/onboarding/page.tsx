"use client"

import { motion } from "framer-motion"
import { Code2, Play, Sparkles, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Code2 className="w-10 h-10 text-black" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-3 flex items-center gap-2 justify-center">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            ReelCode
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </h1>
          <p className="text-white/70 max-w-xs mx-auto">Learn coding concepts in 60-second bite-sized video lessons</p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid gap-4 mb-12 w-full max-w-xs"
        >
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Play className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Quick Learning</h3>
              <p className="text-sm text-white/50">Master coding concepts in just 60-90 seconds bite sized</p>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Code2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Expert Content</h3>
              <p className="text-sm text-white/50">Learn from top tech creators</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3 w-full max-w-xs"
        >
          <Link
            href="/signup"
            className="flex items-center justify-between w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl text-black font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center w-full px-6 py-3 bg-zinc-900/50 backdrop-blur-sm rounded-xl text-white/90 font-medium hover:bg-zinc-900/70 transition-colors"
          >
            I already have an account
          </Link>
        </motion.div>
      </div>
    </div>
  )
}


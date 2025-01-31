'use client'

import { motion } from 'framer-motion'
import { Sparkles, Rocket, Zap, Calendar } from 'lucide-react'

interface FeatureItem {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  date: string
}

const features: FeatureItem[] = [
  {
    id: 1,
    title: "AI-Powered Code Reviews",
    description: "Get instant feedback on your code with our new AI-powered review system.",
    icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    date: "Coming in June"
  },
  {
    id: 2,
    title: "Live Collaborative Coding",
    description: "Code together in real-time with friends and mentors.",
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    date: "Beta testing in July"
  },
  {
    id: 3,
    title: "Advanced Analytics Dashboard",
    description: "Track your progress and identify areas for improvement with detailed insights.",
    icon: <Rocket className="w-5 h-5 text-emerald-400" />,
    date: "Launching in August"
  }
]

function FeatureCard({ feature }: { feature: FeatureItem }) {
  return (
    <motion.div
      className="bg-zinc-900 rounded-xl p-4 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 bg-zinc-800 rounded-full p-2">
          {feature.icon}
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
          <p className="text-xs text-gray-400 mb-2">{feature.description}</p>
          <div className="flex items-center text-xs text-yellow-500">
            <Calendar className="w-3 h-3 mr-1" />
            {feature.date}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function UpcomingFeatures() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center">
        <Rocket className="w-6 h-6 mr-2 text-yellow-500" />
        Coming Soon
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </div>
  )
}


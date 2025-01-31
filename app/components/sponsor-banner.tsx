'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'

interface Sponsor {
  id: number
  name: string
  description: string
  logoUrl: string
  websiteUrl: string
}

const sponsors: Sponsor[] = [
  {
    id: 1,
    name: "TechCorp",
    description: "Leading innovation in software development",
    logoUrl: "/placeholder.svg?height=80&width=80",
    websiteUrl: "https://example.com/techcorp"
  },
  {
    id: 2,
    name: "DevTools Inc.",
    description: "Empowering developers with cutting-edge tools",
    logoUrl: "/placeholder.svg?height=80&width=80",
    websiteUrl: "https://example.com/devtools"
  },
  {
    id: 3,
    name: "CloudSys",
    description: "Revolutionizing cloud computing solutions",
    logoUrl: "/placeholder.svg?height=80&width=80",
    websiteUrl: "https://example.com/cloudsys"
  },
  {
    id: 4,
    name: "AI Innovations",
    description: "Pushing the boundaries of artificial intelligence",
    logoUrl: "/placeholder.svg?height=80&width=80",
    websiteUrl: "https://example.com/aiinnovations"
  },
  {
    id: 5,
    name: "SecureNet",
    description: "Providing top-tier cybersecurity solutions",
    logoUrl: "/placeholder.svg?height=80&width=80",
    websiteUrl: "https://example.com/securenet"
  }
]

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <motion.div
      className="flex flex-col items-center bg-zinc-900 rounded-xl p-4 border border-yellow-500/20 w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={sponsor.logoUrl || "/placeholder.svg"} alt={sponsor.name} className="w-16 h-16 mb-3 rounded-full bg-white/10 p-2" />
      <h3 className="font-bold text-sm mb-1">{sponsor.name}</h3>
      <p className="text-xs text-gray-400 mb-3 text-center">{sponsor.description}</p>
      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-yellow-500 hover:text-yellow-400 transition-colors flex items-center mt-auto"
      >
        Visit Website
        <ExternalLink className="w-3 h-3 ml-1" />
      </a>
    </motion.div>
  )
}

export default function SponsorBanner() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollLeft
      const cardWidth = containerRef.current.offsetWidth
      const newIndex = Math.round(scrollPosition / cardWidth)
      setActiveIndex(newIndex)
    }
  }

  return (
    <div className="relative overflow-hidden">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Star className="w-6 h-6 mr-2 text-yellow-500" />
        Our Sponsors
      </h2>
      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-3"
        onScroll={handleScroll}
      >
        {sponsors.map((sponsor, index) => (
          <div key={sponsor.id} className="flex-shrink-0 w-full snap-center px-3">
            <SponsorCard sponsor={sponsor} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {sponsors.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeIndex ? 'bg-yellow-500' : 'bg-zinc-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}


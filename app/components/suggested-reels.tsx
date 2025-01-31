"use client"

import { motion } from "framer-motion"
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef } from "react"

interface SuggestedReel {
  id: number
  title: string
  sponsoredBy: string
  sponsorLogo?: string
  thumbnail: string
  link: string
}

interface SuggestedReelsProps {
  reels: SuggestedReel[]
  onClose: () => void
}

export default function SuggestedReels({ reels, onClose }: SuggestedReelsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToReel = (index: number) => {
    if (containerRef.current) {
      const reelWidth = containerRef.current.offsetWidth
      containerRef.current.scrollTo({
        left: index * reelWidth,
        behavior: "smooth",
      })
    }
  }

  const nextReel = () => {
    const newIndex = (currentIndex + 1) % reels.length
    setCurrentIndex(newIndex)
    scrollToReel(newIndex)
  }

  const prevReel = () => {
    const newIndex = (currentIndex - 1 + reels.length) % reels.length
    setCurrentIndex(newIndex)
    scrollToReel(newIndex)
  }

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 z-10">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Suggested for you
        </h2>
        <p className="text-sm text-white/60">Sponsored</p>
      </div>
      <div ref={containerRef} className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {reels.map((reel) => (
          <motion.div key={reel.id} className="w-full h-full flex-shrink-0 snap-center">
            <a href={reel.link} className="block relative w-full h-full">
              <img src={reel.thumbnail || "/placeholder.svg"} alt={reel.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{reel.title}</h3>
                    <p className="text-sm text-white/60">Sponsored by {reel.sponsoredBy}</p>
                  </div>
                  {reel.sponsorLogo && (
                    <img
                      src={reel.sponsorLogo || "/placeholder.svg"}
                      alt={reel.sponsoredBy}
                      className="w-8 h-8 rounded-full bg-white/10"
                    />
                  )}
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
      <button
        onClick={prevReel}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextReel}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {reels.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-yellow-500" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}


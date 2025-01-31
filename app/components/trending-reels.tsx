'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Play } from 'lucide-react'
import Image from 'next/image'

const trendingReels = [
  { id: 1, title: "Solving the Two Sum Problem", author: "Alice Johnson", views: 50000, thumbnail: "/placeholder.svg?height=200&width=200" },
  { id: 2, title: "Implementing Quick Sort", author: "Bob Smith", views: 45000, thumbnail: "/placeholder.svg?height=200&width=200" },
  { id: 3, title: "Building a REST API with Node.js", author: "Carol White", views: 40000, thumbnail: "/placeholder.svg?height=200&width=200" },
  { id: 4, title: "React Hooks Explained", author: "David Brown", views: 35000, thumbnail: "/placeholder.svg?height=200&width=200" },
  { id: 5, title: "Machine Learning Basics", author: "Eva Green", views: 30000, thumbnail: "/placeholder.svg?height=200&width=200" },
].sort((a, b) => b.views - a.views);

export default function TrendingReels() {
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
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-yellow-500" />
        Trending Code Reels
      </h2>
      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-3 px-3"
        onScroll={handleScroll}
      >
        {trendingReels.map((reel, index) => (
          <motion.div
            key={reel.id}
            className="flex-shrink-0 w-[200px] snap-center mr-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative aspect-[3/4] bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl overflow-hidden group">
              <Image
                src={reel.thumbnail || "/placeholder.svg"}
                alt={reel.title}
                fill
                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-3">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs font-medium">
                    Trending
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm leading-tight line-clamp-2">{reel.title}</h3>
                  <p className="text-xs text-white/70">{reel.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">{reel.views.toLocaleString()} views</span>
                    <button className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black transform group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {trendingReels.map((_, index) => (
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


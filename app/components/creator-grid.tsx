'use client'

import { useRef, useState } from 'react'
import { Sparkles, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const topCreators = [
  { 
    id: 1, 
    name: "Master JavaScript", 
    author: "CodeMaster",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "60 sec",
    views: "10.5K",
    category: "JavaScript"
  },
  { 
    id: 2, 
    name: "UI/UX Fundamentals", 
    author: "DesignGuru",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "60 sec",
    views: "8.9K",
    category: "Design"
  },
  { 
    id: 3, 
    name: "Machine Learning Basics", 
    author: "DataWizard",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "60 sec",
    views: "12.3K",
    category: "AI/ML"
  },
  { 
    id: 4, 
    name: "AI Development", 
    author: "AIExpert",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "60 sec",
    views: "15K",
    category: "AI/ML"
  }
]

export default function CreatorGrid() {
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
    <div className="relative space-y-4 rounded-3xl bg-gradient-to-b from-zinc-900 via-black to-zinc-900 p-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>
      <div className="relative text-center space-y-3 mb-8">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          Top Creators
          <Sparkles className="w-6 h-6 text-yellow-500" />
        </h2>
        <p className="text-white/70">Get bite sized knowledge in 60 seconds</p>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4"
        onScroll={handleScroll}
      >
        {topCreators.map((creator, index) => (
          <motion.div
            key={creator.id}
            className="flex-shrink-0 w-[300px] snap-center mr-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative aspect-[3/4] bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl overflow-hidden group">
              <Image
                src={creator.thumbnail || "/placeholder.svg"}
                alt={creator.name}
                fill
                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs font-medium">
                    {creator.category}
                  </span>
                  <span className="px-3 py-1 bg-black/50 text-white rounded-full text-xs backdrop-blur-sm">
                    {creator.duration}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg leading-tight">{creator.name}</h3>
                  <p className="text-sm text-white/70">{creator.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">{creator.views} views</span>
                    <button className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {topCreators.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeIndex ? 'bg-yellow-500' : 'bg-zinc-600'
            }`}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button className="px-6 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition-colors text-sm font-medium">
          Explore More
        </button>
      </div>
    </div>
  )
}


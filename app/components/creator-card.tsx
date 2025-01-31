'use client'

import { motion, useAnimation, PanInfo } from 'framer-motion'
import { User, Users, MapPin, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Creator {
  id: number
  name: string
  specialty: string
  followers: number
  coins: number
  location: string
  type: string
  reelUrl: string
}

interface CreatorCardProps {
  creator: Creator
  onSwipe: (direction: number) => void
  totalCreators: number
  currentIndex: number
}

export default function CreatorCard({ creator, onSwipe, totalCreators, currentIndex }: CreatorCardProps) {
  const controls = useAnimation()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    controls.start({ x: 0, opacity: 1 })
  }, [creator, controls])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x < -threshold) {
      onSwipe(1)
      controls.start({ x: -300, opacity: 0 })
    } else if (info.offset.x > threshold) {
      onSwipe(-1)
      controls.start({ x: 300, opacity: 0 })
    } else {
      controls.start({ x: 0 })
    }
  }

  return (
    <motion.div
      className="w-full max-w-[250px] bg-zinc-900 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/5"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ x: 300, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="relative aspect-[16/9] bg-black">
        {isPlaying ? (
          <iframe
            src={creator.reelUrl}
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="bg-yellow-500 rounded-full p-2 text-black hover:bg-yellow-400 transition-colors"
            >
              <Play className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      <div className="p-2 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold">{creator.name}</h2>
            <div className="flex items-center gap-1 text-xs text-white/50">
              <span>{creator.type}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-2 h-2" />
                {creator.location}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded-full">
            <span className="text-yellow-500 font-medium text-xs">{creator.coins}</span>
            <span className="text-yellow-500/70 text-[10px]">coins</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-white/70 text-xs">
            <Users className="w-3 h-3" />
            <span>{creator.followers.toLocaleString()} followers</span>
          </div>
          <p className="text-white/50 text-xs line-clamp-2">
            Specializes in {creator.specialty} and creating educational content
          </p>
        </div>
      </div>

      <div className="p-2 border-t border-white/5 flex gap-2">
        <button className="flex-1 py-1 rounded-full bg-yellow-500 text-black text-xs font-medium hover:bg-yellow-400 transition-colors">
          Follow
        </button>
        <button className="flex-1 py-1 rounded-full bg-white/5 text-white text-xs font-medium hover:bg-white/10 transition-colors">
          View
        </button>
      </div>
    </motion.div>
  )
}


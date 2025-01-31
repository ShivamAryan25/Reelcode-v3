"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useSwipeable } from "react-swipeable"
import { useSwipeDetection } from "../hooks/useSwipeDetection"

const featuredCreators = [
  {
    id: 1,
    name: "John Doe",
    specialty: "Full-Stack Development",
    followers: 100000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Jane Smith",
    specialty: "UI/UX Design",
    followers: 95000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Alex Johnson",
    specialty: "Machine Learning",
    followers: 90000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Emily Brown",
    specialty: "Mobile Development",
    followers: 85000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Michael Lee",
    specialty: "Cybersecurity",
    followers: 80000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    specialty: "Data Science",
    followers: 75000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 7,
    name: "David Taylor",
    specialty: "Game Development",
    followers: 70000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    specialty: "Cloud Computing",
    followers: 65000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 9,
    name: "Ryan Anderson",
    specialty: "Blockchain",
    followers: 60000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 10,
    name: "Sophia Kim",
    specialty: "AR/VR Development",
    followers: 55000,
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function FeaturedCreators() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextCreator = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredCreators.length)
  }

  const prevCreator = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredCreators.length) % featuredCreators.length)
  }

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeDetection(nextCreator, prevCreator)

  const handlers = useSwipeable({
    onSwipedLeft: nextCreator,
    onSwipedRight: prevCreator,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    swipeDuration: 500,
    delta: 50,
  })

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Star className="w-6 h-6 text-yellow-500" />
        Featured Creators of the Month
      </h2>
      <div {...handlers} className="relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500">
        <motion.div
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div
          className="relative z-10 p-4 flex items-center justify-between"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button
            onClick={prevCreator}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 flex-1 justify-center"
          >
            <Image
              src={featuredCreators[currentIndex].avatar || "/placeholder.svg"}
              alt={featuredCreators[currentIndex].name}
              width={80}
              height={80}
              className="rounded-full border-2 border-white"
            />
            <div className="text-white">
              <h3 className="font-semibold text-lg">{featuredCreators[currentIndex].name}</h3>
              <p className="text-sm text-white/80">{featuredCreators[currentIndex].specialty}</p>
              <p className="text-sm text-white/60">
                {featuredCreators[currentIndex].followers.toLocaleString()} followers
              </p>
            </div>
          </motion.div>
          <button
            onClick={nextCreator}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex justify-center space-x-2">
        {featuredCreators.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-yellow-500" : "bg-zinc-600"
            }`}
          />
        ))}
      </div>
    </div>
  )
}


'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Book, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const techStacks = [
  "All Courses",
  "React",
  "Python",
  "Full-Stack",
  "Machine Learning",
  "iOS Development"
]

const courses = [
  { id: 1, title: "Advanced React Patterns", author: "Jane Doe", duration: "4h 30m", level: "Advanced", image: "/placeholder.svg?height=80&width=140", techStack: "React" },
  { id: 2, title: "Python for Data Science", author: "John Smith", duration: "6h 15m", level: "Intermediate", image: "/placeholder.svg?height=80&width=140", techStack: "Python" },
  { id: 3, title: "Full-Stack Development with MERN", author: "Alice Johnson", duration: "8h 45m", level: "Intermediate", image: "/placeholder.svg?height=80&width=140", techStack: "Full-Stack" },
  { id: 4, title: "Machine Learning Fundamentals", author: "Bob Wilson", duration: "5h 30m", level: "Beginner", image: "/placeholder.svg?height=80&width=140", techStack: "Machine Learning" },
  { id: 5, title: "iOS App Development with Swift", author: "Emma Brown", duration: "7h 20m", level: "Intermediate", image: "/placeholder.svg?height=80&width=140", techStack: "iOS Development" },
]

export default function CreatorCourses() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedTechStack, setSelectedTechStack] = useState("All Courses")
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollLeft
      const cardWidth = containerRef.current.offsetWidth
      const newIndex = Math.round(scrollPosition / cardWidth)
      setActiveIndex(newIndex)
    }
  }

  const filteredCourses = selectedTechStack === "All Courses" 
    ? courses 
    : courses.filter(course => course.techStack === selectedTechStack)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Book className="w-6 h-6 text-yellow-500" />
          Featured Courses
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-zinc-900 border-white/10 text-white hover:bg-zinc-800">
              {selectedTechStack} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-900 border-white/10">
            {techStacks.map((stack) => (
              <DropdownMenuItem 
                key={stack} 
                onClick={() => setSelectedTechStack(stack)}
                className="text-white hover:bg-zinc-800"
              >
                {stack}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4"
        onScroll={handleScroll}
      >
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            className="flex-shrink-0 w-[220px] snap-center mr-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-zinc-900 rounded-xl overflow-hidden border border-white/5">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                width={220}
                height={124}
                className="w-full object-cover"
              />
              <div className="p-3 space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2">{course.title}</h3>
                <p className="text-xs text-white/70">{course.author}</p>
                <div className="flex justify-between text-xs text-white/50">
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                </div>
                <button className="w-full py-1.5 mt-2 bg-yellow-500 text-black rounded-full text-xs font-medium hover:bg-yellow-400 transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {filteredCourses.map((_, index) => (
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


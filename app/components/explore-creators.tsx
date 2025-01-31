'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, ChevronDown, Play, Search } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const techStacks = [
  "All",
  "React",
  "Python",
  "JavaScript",
  "Machine Learning",
  "iOS Development"
]

const creators = [
  { id: 1, name: "Alice Johnson", techStack: "React", followers: 50000, avatar: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Bob Smith", techStack: "Python", followers: 45000, avatar: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Carol White", techStack: "JavaScript", followers: 40000, avatar: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "David Brown", techStack: "Machine Learning", followers: 35000, avatar: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "Eva Green", techStack: "iOS Development", followers: 30000, avatar: "/placeholder.svg?height=200&width=200" },
  { id: 6, name: "Frank Lee", techStack: "React", followers: 28000, avatar: "/placeholder.svg?height=200&width=200" },
  { id: 7, name: "Grace Kim", techStack: "Python", followers: 32000, avatar: "/placeholder.svg?height=200&width=200" },
  { id: 8, name: "Henry Cho", techStack: "JavaScript", followers: 27000, avatar: "/placeholder.svg?height=200&width=200" },
  { id: 9, name: "Ivy Wong", techStack: "Machine Learning", followers: 38000, avatar: "/placeholder.svg?height=200&width=200" },
  { id: 10, name: "Jack Davis", techStack: "iOS Development", followers: 29000, avatar: "/placeholder.svg?height=200&width=200" },
  { id: 11, name: "Kelly Chen", techStack: "React", followers: 31000, avatar: "/placeholder.svg?height=200&width=200" },
  { id: 12, name: "Liam Wilson", techStack: "Python", followers: 33000, avatar: "/placeholder.svg?height=200&width=200" },
]

export default function ExploreCreators() {
  const [selectedTechStack, setSelectedTechStack] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCreators = creators
    .filter(creator => selectedTechStack === "All" || creator.techStack === selectedTechStack)
    .filter(creator => creator.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-yellow-500" />
          Explore Creators
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search creators..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 -mx-2 px-2">
        {filteredCreators.map((creator, index) => (
          <motion.div
            key={creator.id}
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="relative aspect-square bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl overflow-hidden group">
              <Image
                src={creator.avatar || "/placeholder.svg"}
                alt={creator.name}
                fill
                className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-2">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs font-medium">
                    {creator.techStack}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm leading-tight truncate">{creator.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">{creator.followers.toLocaleString()} followers</span>
                    <button className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black transform group-hover:scale-110 transition-transform">
                      <Play className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {filteredCreators.length === 0 && (
        <div className="text-center text-white/50 py-8">
          No creators found. Try adjusting your search or filter.
        </div>
      )}
    </div>
  )
}


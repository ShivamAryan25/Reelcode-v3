'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, MessageSquare, Award, Zap } from 'lucide-react'

interface CommunityMember {
  id: number
  name: string
  role: string
  contributions: number
  badges: number
  avatarUrl: string
  recentActivity: string
}

const communityMembers: CommunityMember[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Moderator",
    contributions: 250,
    badges: 15,
    avatarUrl: "/placeholder.svg?height=100&width=100",
    recentActivity: "Organized a JavaScript meetup"
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Top Contributor",
    contributions: 500,
    badges: 20,
    avatarUrl: "/placeholder.svg?height=100&width=100",
    recentActivity: "Answered 50 questions this week"
  },
  {
    id: 3,
    name: "Carol White",
    role: "Event Organizer",
    contributions: 150,
    badges: 10,
    avatarUrl: "/placeholder.svg?height=100&width=100",
    recentActivity: "Hosted a coding workshop"
  },
  {
    id: 4,
    name: "David Brown",
    role: "Rising Star",
    contributions: 100,
    badges: 5,
    avatarUrl: "/placeholder.svg?height=100&width=100",
    recentActivity: "Started a study group for beginners"
  },
  {
    id: 5,
    name: "Eva Green",
    role: "Content Creator",
    contributions: 300,
    badges: 18,
    avatarUrl: "/placeholder.svg?height=100&width=100",
    recentActivity: "Published a tutorial series on React"
  }
]

function CommunityMemberCard({ member }: { member: CommunityMember }) {
  return (
    <motion.div
      className="w-full max-w-[250px] bg-zinc-900 rounded-xl overflow-hidden border border-white/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <img src={member.avatarUrl || "/placeholder.svg"} alt={member.name} className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="font-bold text-sm">{member.name}</h3>
            <p className="text-xs text-yellow-500">{member.role}</p>
          </div>
        </div>
        <div className="flex justify-between text-xs">
          <div className="flex items-center">
            <MessageSquare className="w-3 h-3 mr-1 text-emerald-500" />
            <span>{member.contributions} contributions</span>
          </div>
          <div className="flex items-center">
            <Award className="w-3 h-3 mr-1 text-purple-500" />
            <span>{member.badges} badges</span>
          </div>
        </div>
        <div className="bg-zinc-800 rounded-lg p-2">
          <p className="text-xs text-white/70">
            <Zap className="w-3 h-3 inline mr-1 text-yellow-500" />
            Recent: {member.recentActivity}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function CommunityGrid() {
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
    <div className="relative">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Users className="w-6 h-6 mr-2 text-yellow-500" />
        Community Highlights
      </h2>
      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
        onScroll={handleScroll}
      >
        {communityMembers.map((member, index) => (
          <div key={member.id} className="flex-shrink-0 w-[250px] snap-center mr-4">
            <CommunityMemberCard member={member} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {communityMembers.map((_, index) => (
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


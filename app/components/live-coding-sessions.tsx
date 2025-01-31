"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Play, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Session {
  id: number
  title: string
  host: string
  participants: number
  duration: string
  tags: string[]
}

const sessions: Session[] = [
  {
    id: 1,
    title: "Building a Real-time Chat App with Socket.io",
    host: "Emma Wilson",
    participants: 24,
    duration: "1h 30m",
    tags: ["javascript", "node.js", "socket.io"],
  },
  {
    id: 2,
    title: "Solving LeetCode Hard Problems",
    host: "Alex Chen",
    participants: 18,
    duration: "2h",
    tags: ["algorithms", "data-structures", "problem-solving"],
  },
  {
    id: 3,
    title: "Intro to Machine Learning with Python",
    host: "Sophia Lee",
    participants: 32,
    duration: "1h 45m",
    tags: ["python", "machine-learning", "data-science"],
  },
  // Add more sample sessions here...
]

export default function LiveCodingSessions() {
  const [joinedSessions, setJoinedSessions] = useState<number[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isStarCreator, setIsStarCreator] = useState(false) // This should be determined based on the user's status

  const handleJoin = (sessionId: number) => {
    setJoinedSessions((prev) =>
      prev.includes(sessionId) ? prev.filter((id) => id !== sessionId) : [...prev, sessionId],
    )
  }

  const SessionDialog = () => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle>Start a Live Coding Session</DialogTitle>
          <DialogDescription>Fill in the details for your live coding session.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" className="col-span-3 bg-zinc-800 text-white" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" className="col-span-3 bg-zinc-800 text-white" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="techStack" className="text-right">
              Tech Stack
            </Label>
            <Input id="techStack" className="col-span-3 bg-zinc-800 text-white" />
          </div>
          {isStarCreator ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fee" className="text-right">
                Fee ($)
              </Label>
              <Input id="fee" type="number" className="col-span-3 bg-zinc-800 text-white" />
            </div>
          ) : (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="limit" className="text-right">
                Participant Limit
              </Label>
              <Input id="limit" type="number" className="col-span-3 bg-zinc-800 text-white" />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-yellow-500 text-black hover:bg-yellow-600">
            Start Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-yellow-500" />
          Live Coding Sessions
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="bg-yellow-500 text-black hover:bg-yellow-600"
          onClick={() => setIsDialogOpen(true)}
        >
          Start a Session
        </Button>
      </div>
      <div className="grid gap-4">
        {sessions.map((session) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-900 rounded-xl p-4 space-y-4"
          >
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{session.host[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{session.title}</h3>
                <p className="text-sm text-gray-400">Hosted by {session.host}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {session.participants} participants
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {session.duration}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {session.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-zinc-800 rounded-full text-xs text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleJoin(session.id)}
              className={`w-full ${
                joinedSessions.includes(session.id)
                  ? "bg-yellow-500 text-black hover:bg-yellow-600"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              <Play className="w-4 h-4 mr-2" />
              {joinedSessions.includes(session.id) ? "Joined" : "Join Session"}
            </Button>
          </motion.div>
        ))}
      </div>
      <SessionDialog />
    </div>
  )
}


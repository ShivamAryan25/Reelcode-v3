"use client"

import { useState } from "react"
import { Search, Bell, User, Code2, Users, Zap, PlusCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import BottomNav from "../components/bottom-nav"
import CommunityPosts from "../components/community-posts"
import LiveCodingSessions from "../components/live-coding-sessions"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CreatePostWindow from "../components/create-post-window"
import CreateProjectForm from "../components/create-project-form"

const useSwipeDetection = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      onSwipeLeft()
    }
    if (isRightSwipe) {
      onSwipeRight()
    }
  }

  return { onTouchStart, onTouchMove, onTouchEnd }
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [createPostType, setCreatePostType] = useState<"problem" | "project" | null>(null)
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)

  const handleCreatePost = (type: "problem" | "project") => {
    setCreatePostType(type)
    setIsCreatePostOpen(true)
  }

  return (
    <main className="min-h-screen bg-black text-white max-w-4xl mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full shadow-sm">
              <span className="font-playfair font-bold text-black text-xs">RC</span>
            </div>
            <span className="font-playfair text-base text-white">ReelCode Community</span>
            <div className="relative flex-1 max-w-[180px]">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
              <Input
                placeholder="Search community..."
                className="w-full bg-white/5 border-transparent rounded-full pl-7 pr-3 py-1 focus:ring-1 focus:ring-yellow-500/50 h-7 text-xs text-white placeholder:text-gray-500"
                onFocus={() => setIsSearchOpen(true)}
              />
            </div>
            <button className="relative text-white/70 hover:text-yellow-500 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full text-[8px] flex items-center justify-center text-black font-medium">
                3
              </span>
            </button>
            <button className="text-white/70 hover:text-yellow-500 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="px-3 pt-3">
        <div className="bg-zinc-900/50 backdrop-blur-sm p-1 rounded-full">
          <div className="flex gap-1">
            <Button
              onClick={() => setActiveTab("all")}
              className={`
                flex-1 px-4 py-1.5 rounded-full text-xs font-medium transition-all
                ${
                  activeTab === "all"
                    ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-sm"
                    : "text-white hover:bg-white/5"
                }
              `}
            >
              All
            </Button>
            <Button
              onClick={() => setActiveTab("problems")}
              className={`
                flex-1 px-4 py-1.5 rounded-full text-xs font-medium transition-all
                ${
                  activeTab === "problems"
                    ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-sm"
                    : "text-white hover:bg-white/5"
                }
              `}
            >
              Problems
            </Button>
            <Button
              onClick={() => setActiveTab("projects")}
              className={`
                flex-1 px-4 py-1.5 rounded-full text-xs font-medium transition-all
                ${
                  activeTab === "projects"
                    ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-sm"
                    : "text-white hover:bg-white/5"
                }
              `}
            >
              Projects
            </Button>
            <Button
              onClick={() => setActiveTab("live")}
              className={`
                flex-1 px-4 py-1.5 rounded-full text-xs font-medium transition-all
                ${
                  activeTab === "live"
                    ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-sm"
                    : "text-white hover:bg-white/5"
                }
              `}
            >
              Live
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-3 pb-24 space-y-6">
        {activeTab !== "live" && (
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {activeTab === "all" && <Users className="w-6 h-6 text-yellow-500" />}
              {activeTab === "problems" && <Code2 className="w-6 h-6 text-yellow-500" />}
              {activeTab === "projects" && <Zap className="w-6 h-6 text-yellow-500" />}
              {activeTab === "all" && "Community Feed"}
              {activeTab === "problems" && "Coding Problems"}
              {activeTab === "projects" && "Open Source Projects"}
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-zinc-900 border-white/10 text-white hover:bg-zinc-800"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-900 border-white/10">
                <DropdownMenuItem onClick={() => handleCreatePost("problem")} className="text-white hover:bg-zinc-800">
                  New Problem
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsCreateProjectOpen(true)} className="text-white hover:bg-zinc-800">
                  New Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {activeTab !== "live" ? <CommunityPosts activeTab={activeTab} /> : <LiveCodingSessions />}
      </div>

      <BottomNav />

      {isCreatePostOpen && createPostType && (
        <CreatePostWindow
          type={createPostType}
          onClose={() => {
            setIsCreatePostOpen(false)
            setCreatePostType(null)
          }}
        />
      )}
      {isCreateProjectOpen && <CreateProjectForm onClose={() => setIsCreateProjectOpen(false)} />}
    </main>
  )
}


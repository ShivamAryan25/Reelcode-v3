"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle } from "lucide-react"
import ReelViewer from "../components/reel-viewer"
import ReelActions from "../components/reel-actions"
import CommentSection from "../components/comment-section"
import { useSwipeGesture } from "../hooks/useSwipeGesture"
import { debounce } from "@/lib/utils"
import SuggestedReels from "../components/suggested-reels"
import React from "react" // Added import for React

const initialReels = [
  {
    id: 1,
    title: "Optimise Your Resume",
    creator: {
      id: "resumeexpert",
      name: "ResumeExpert",
      isStarCreator: true,
    },
    creatorAvatar: "/placeholder.svg?height=100&width=100",
    description:
      "Learn essential tips to make your resume stand out, tailored for tech roles. This reel covers formatting, content organization, and highlighting your key skills effectively. We'll dive deep into each section of a typical tech resume, providing concrete examples and best practices. You'll learn how to showcase your projects, emphasize your technical skills, and craft compelling bullet points that catch a recruiter's eye. By the end of this reel, you'll have the knowledge to create a resume that not only passes ATS scans but also impresses human recruiters, significantly boosting your chances of landing interviews in the competitive tech industry.",
    episodes: 5,
    videoUrl: "",
    likes: 1200,
    followers: "1.2K",
    comments: [
      {
        id: 1,
        user: "TechRecruiter",
        text: "Great tips! I always look for these elements in resumes.",
        likes: 15,
        replies: [],
        timestamp: "2 hours ago",
        reactions: [],
      },
      {
        id: 2,
        user: "CodeNewbie",
        text: "This helped me land my first job! Thanks!",
        likes: 8,
        replies: [],
        timestamp: "1 day ago",
        reactions: [],
      },
    ],
    shares: 89,
  },
  {
    id: 2,
    title: "Master React Hooks",
    creator: {
      id: "reactninja",
      name: "ReactNinja",
      isStarCreator: false,
    },
    creatorAvatar: "/placeholder.svg?height=100&width=100",
    description:
      "Deep dive into React hooks with practical examples. Learn how to use useState, useEffect, useContext, and custom hooks to build efficient and maintainable React applications. This comprehensive reel covers everything from basic state management to complex side effects and context usage. We'll explore real-world scenarios where each hook shines, and discuss best practices for hook implementation. You'll also learn about less commonly used hooks like useReducer, useMemo, and useCallback, understanding when and how to leverage them for optimal performance. By the end of this reel, you'll have a solid grasp on how to think in React hooks, enabling you to write cleaner, more efficient React code.",
    episodes: 4,
    videoUrl: "",
    likes: 980,
    followers: "956",
    comments: [
      {
        id: 1,
        user: "HooksMaster",
        text: "Excellent explanation of useCallback!",
        likes: 12,
        replies: [],
        timestamp: "3 hours ago",
        reactions: [],
      },
      {
        id: 2,
        user: "ReactLearner",
        text: "Could you explain useMemo in more detail?",
        likes: 5,
        replies: [],
        timestamp: "5 hours ago",
        reactions: [],
      },
    ],
    shares: 67,
  },
]

const suggestedReelsData = [
  {
    id: 1,
    title: "Learn Advanced TypeScript Patterns",
    sponsoredBy: "TechEd",
    thumbnail: "/placeholder.svg?height=200&width=400",
    link: "#",
  },
  {
    id: 2,
    title: "Master React Performance",
    sponsoredBy: "CodeAcademy",
    thumbnail: "/placeholder.svg?height=200&width=400",
    link: "#",
  },
  {
    id: 3,
    title: "Build Scalable Node.js Applications",
    sponsoredBy: "ServerPro",
    thumbnail: "/placeholder.svg?height=200&width=400",
    link: "#",
  },
  {
    id: 4,
    title: "Data Structures for Coding Interviews",
    sponsoredBy: "AlgoExpert",
    thumbnail: "/placeholder.svg?height=200&width=400",
    link: "#",
  },
]

export default function ReelCodePage() {
  const [reels, setReels] = useState(initialReels)
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [likedReels, setLikedReels] = useState<number[]>([])
  const [savedReels, setSavedReels] = useState<number[]>([])
  const [followedCreators, setFollowedCreators] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [playingReels, setPlayingReels] = useState<number[]>([0])

  const containerRef = useRef<HTMLDivElement>(null)

  const handleLike = (reelId: number) => {
    setLikedReels((prev) => (prev.includes(reelId) ? prev.filter((id) => id !== reelId) : [...prev, reelId]))
    setReels((prevReels) =>
      prevReels.map((reel) =>
        reel.id === reelId ? { ...reel, likes: reel.likes + (likedReels.includes(reelId) ? -1 : 1) } : reel,
      ),
    )
  }

  const handleSave = (reelId: number) => {
    setSavedReels((prev) => (prev.includes(reelId) ? prev.filter((id) => id !== reelId) : [...prev, reelId]))
  }

  const onFollow = (creatorId: string) => {
    setFollowedCreators((prev) =>
      prev.includes(creatorId) ? prev.filter((id) => id !== creatorId) : [...prev, creatorId],
    )
  }

  const handleAddComment = (comment: any) => {
    setReels((prevReels) =>
      prevReels.map((reel, index) =>
        index === currentReelIndex ? { ...reel, comments: [comment, ...reel.comments] } : reel,
      ),
    )
  }

  const loadMoreReels = () => {
    setIsLoading(true)
    setTimeout(() => {
      const newReels = Array.from({ length: 2 }, (_, i) => ({
        id: reels.length + i + 1,
        title: `New Reel ${reels.length + i + 1}`,
        creator: {
          id: `creator${reels.length + i + 1}`,
          name: `Creator ${reels.length + i + 1}`,
          isStarCreator: false,
        },
        creatorAvatar: "/placeholder.svg?height=100&width=100",
        description: `This is a new reel ${reels.length + i + 1} loaded dynamically.`,
        episodes: Math.floor(Math.random() * 5) + 1,
        videoUrl: "",
        likes: Math.floor(Math.random() * 1000),
        followers: `${Math.floor(Math.random() * 1000)}`,
        comments: [],
        shares: Math.floor(Math.random() * 100),
      }))
      setReels((prev) => [...prev, ...newReels])
      setIsLoading(false)
    }, 1000)
  }

  const handlePlayPause = (index: number) => {
    setPlayingReels((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  useSwipeGesture({
    onSwipeUp: () => {
      if (currentReelIndex < reels.length - 1) {
        setCurrentReelIndex((prevIndex) => prevIndex + 1)
      } else {
        loadMoreReels()
      }
    },
    onSwipeDown: () => {
      if (currentReelIndex > 0) {
        setCurrentReelIndex((prevIndex) => prevIndex - 1)
      }
    },
    threshold: 50,
  })

  const handleScroll = useCallback(
    debounce(() => {
      if (containerRef.current) {
        const { scrollTop, clientHeight } = containerRef.current
        const newIndex = Math.round(scrollTop / clientHeight)
        setCurrentReelIndex(newIndex)
        setPlayingReels([newIndex])
      }
    }, 50),
    [],
  )

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [handleScroll])

  const renderReel = (reel: any, index: number) => (
    <div key={reel.id} className="h-full w-full snap-start" style={{ scrollSnapAlign: "start" }}>
      <ReelViewer
        reel={reel}
        isActive={index === currentReelIndex}
        isPlaying={playingReels.includes(index)}
        onPlayPause={() => handlePlayPause(index)}
        onFollow={onFollow}
        isFollowed={followedCreators.includes(reel.creator.id)}
      >
        <ReelActions
          reel={reel}
          isLiked={likedReels.includes(reel.id)}
          isSaved={savedReels.includes(reel.id)}
          onLike={() => handleLike(reel.id)}
          onSave={() => handleSave(reel.id)}
          onCommentClick={() => setShowComments(true)}
          showComments={showComments}
        />
      </ReelViewer>
    </div>
  )

  const renderSuggestedReels = () => (
    <div className="h-full w-full snap-start flex items-center justify-center bg-zinc-900">
      <div className="w-full max-w-md">
        <SuggestedReels reels={suggestedReelsData} onClose={() => {}} />
      </div>
    </div>
  )

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden">
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {reels.map((reel, index) => {
          if ((index + 1) % 5 === 0) {
            return (
              <React.Fragment key={`reel-group-${index}`}>
                {renderReel(reel, index)}
                {renderSuggestedReels()}
              </React.Fragment>
            )
          }
          return renderReel(reel, index)
        })}
        {isLoading && (
          <div className="h-full w-full flex items-center justify-center">
            <p>Loading more reels...</p>
          </div>
        )}
      </div>
      <AnimatePresence>
        {showComments && (
          <CommentSection
            initialComments={reels[currentReelIndex].comments}
            onClose={() => setShowComments(false)}
            onAddComment={handleAddComment}
          />
        )}
      </AnimatePresence>
    </div>
  )
}


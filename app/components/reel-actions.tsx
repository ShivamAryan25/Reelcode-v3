"use client"

import { Heart, MessageCircle, Share2, Bookmark, Send, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface ReelActionsProps {
  reel: {
    id: number
    likes: number
    comments: Array<{
      id: number
      user: string
      text: string
      likes: number
      replies: Array<any>
    }>
    shares: number
    creator: {
      id: string
      name: string
      isStarCreator: boolean
    }
    title: string // Added title property
  }
  isLiked: boolean
  isSaved: boolean
  onLike: () => void
  onSave: () => void
  onCommentClick: () => void
  showComments: boolean
}

export default function ReelActions({
  reel,
  isLiked,
  isSaved,
  onLike,
  onSave,
  onCommentClick,
  showComments,
}: ReelActionsProps) {
  const router = useRouter()
  const [isSharing, setIsSharing] = useState(false)

  if (showComments) return null

  const handleChatClick = () => {
    router.push(`/inbox?creatorId=${reel.creator.id}&creatorName=${encodeURIComponent(reel.creator.name)}`)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: reel.title,
          text: `Check out this reel: ${reel.title}`,
          url: `https://reelcode.com/reel/${reel.id}`, // Replace with your actual URL structure
        })
        console.log("Reel shared successfully")
      } catch (error) {
        console.error("Error sharing reel:", error)
        // Fallback to clipboard copying
        await fallbackShare()
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      await fallbackShare()
    }
  }

  const fallbackShare = async () => {
    const shareUrl = `https://reelcode.com/reel/${reel.id}` // Replace with your actual URL structure
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert("Share link copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy: ", err)
      alert("Unable to share. Please copy this link manually: " + shareUrl)
    }
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-3 bg-gradient-to-t from-black via-black/80 to-transparent">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ActionButton
            icon={<Heart className={`w-6 h-6 ${isLiked ? "fill-yellow-500 text-yellow-500" : "text-white"}`} />}
            label={reel.likes.toString()}
            onClick={onLike}
          />
          <ActionButton
            icon={<MessageCircle className="w-6 h-6 text-white" />}
            label={reel.comments.length.toString()}
            onClick={onCommentClick}
          />
          <ActionButton
            icon={isSharing ? <span className="loading">...</span> : <Share2 className="w-6 h-6 text-white" />}
            label={reel.shares.toString()}
            onClick={async () => {
              setIsSharing(true)
              await handleShare()
              setIsSharing(false)
            }}
          />
          <ActionButton
            icon={<MessageSquare className="w-6 h-6 text-white" />}
            label="Talk to Creator"
            onClick={handleChatClick}
          />
        </div>
        <div className="flex items-center">
          <ActionButton
            icon={<Bookmark className={`w-6 h-6 ${isSaved ? "fill-yellow-500 text-yellow-500" : "text-white"}`} />}
            label={isSaved ? "Saved" : "Save"}
            onClick={onSave}
          />
        </div>
      </div>
    </div>
  )
}

interface ActionButtonProps {
  icon: React.ReactNode
  label?: string
  onClick?: () => void
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1"
    >
      {icon}
      {label && <span className="text-xs font-medium text-white">{label}</span>}
    </motion.button>
  )
}


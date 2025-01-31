"use client"

import { useState } from "react"
import { ChevronDown, X, MoreHorizontal, MessageCircle, ThumbsUp, AtSign } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Comment {
  id: number
  user: string
  text: string
  timestamp: string
  likes: number
  hasLiked?: boolean
  avatar?: string
  replies: Comment[]
}

interface CommentSectionProps {
  initialComments?: Comment[]
  onClose: () => void
  onAddComment: (comment: Comment) => void
}

const quickReplies = ["Well said JT", "I agree", "Thanks for sharing", "Interesting", "Great point"]

export default function CommentSection({ initialComments = [], onClose, onAddComment }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [sortBy, setSortBy] = useState("Most relevant")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        user: "Current User",
        text: newComment.trim(),
        likes: 0,
        replies: [],
        timestamp: "Just now",
      }
      setComments((prevComments) => [newCommentObj, ...prevComments])
      onAddComment(newCommentObj)
      setNewComment("")
    }
  }

  const handleLike = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.hasLiked ? comment.likes - 1 : comment.likes + 1,
            hasLiked: !comment.hasLiked,
          }
        }
        return comment
      }),
    )
  }

  const handleReply = (commentId: number) => {
    setReplyingTo(replyingTo === commentId ? null : commentId)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 bg-zinc-900 rounded-t-xl max-h-[85vh] overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-zinc-800">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 text-sm text-white/90 hover:text-white">
            {sortBy}
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-800 border-zinc-700">
            <DropdownMenuItem
              onClick={() => setSortBy("Most relevant")}
              className="text-white/90 hover:text-white hover:bg-zinc-700"
            >
              Most relevant
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy("Most recent")}
              className="text-white/90 hover:text-white hover:bg-zinc-700"
            >
              Most recent
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <button onClick={onClose} className="text-white/70 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Comments List */}
      <div className="overflow-y-auto max-h-[calc(85vh-180px)] p-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="w-10 h-10 rounded-full border border-zinc-800">
              <AvatarImage src={comment.avatar || "/placeholder.svg"} />
              <AvatarFallback>{comment.user[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white/90">{comment.user}</span>
                    <span className="text-xs text-white/50">{comment.timestamp}</span>
                  </div>
                </div>
                <button className="text-white/50 hover:text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-white/80">{comment.text}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center gap-1 text-xs ${
                    comment.hasLiked ? "text-yellow-500" : "text-white/50"
                  } hover:text-yellow-500`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  {comment.likes > 0 && <span>{comment.likes}</span>}
                  Like
                </button>
                <button
                  onClick={() => handleReply(comment.id)}
                  className="flex items-center gap-1 text-xs text-white/50 hover:text-white"
                >
                  <MessageCircle className="w-3 h-3" />
                  Reply
                </button>
                {replyingTo === comment.id && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      const replyText = (e.target as HTMLFormElement).reply.value
                      if (replyText.trim()) {
                        onAddComment({
                          id: Date.now(),
                          user: "Current User",
                          text: replyText.trim(),
                          timestamp: "Just now",
                          likes: 0,
                          replies: [],
                        })
                        setReplyingTo(null)
                      }
                    }}
                    className="mt-2"
                  >
                    <input
                      name="reply"
                      className="w-full bg-zinc-800 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
                      placeholder="Write a reply..."
                    />
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Replies */}
      <div className="sticky bottom-0 bg-zinc-900 border-t border-zinc-800">
        <div className="px-4 py-3 overflow-x-auto flex gap-2 no-scrollbar">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => setNewComment(reply)}
              className="flex-none px-4 py-1.5 rounded-full border border-yellow-500/30 text-yellow-500 text-xs hover:bg-yellow-500/10 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Comment Input */}
        <div className="p-4 flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Leave your thoughts here..."
                className="w-full bg-zinc-800 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 placeholder:text-white/30"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-yellow-500"
              >
                <AtSign className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


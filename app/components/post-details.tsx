"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, MessageCircle, ThumbsUp, Share2, Code2, Zap, Send, ChevronUp, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface Comment {
  id: number
  user: string
  text: string
  timestamp: string
  likes: number
  hasLiked: boolean
  replies: Comment[]
}

interface Post {
  id: number
  type: "problem" | "project"
  title: string
  author: string
  content: string
  likes: number
  comments: Comment[]
  shares: number
  tags: string[]
}

interface PostDetailsProps {
  post: Post
  onClose: () => void
  onLike: (postId: number) => void
  isLiked: boolean
}

export default function PostDetails({ post, onClose, onLike, isLiked }: PostDetailsProps) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>(post.comments)

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now(),
        user: "Current User",
        text: newComment.trim(),
        timestamp: "Just now",
        likes: 0,
        hasLiked: false,
        replies: [],
      }
      setComments((prevComments) => [newCommentObj, ...prevComments])
      setNewComment("")
    }
  }

  const handleLikeComment = (commentId: number) => {
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

  const handleAddReply = (commentId: number, replyText: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(),
                user: "Current User",
                text: replyText,
                timestamp: "Just now",
                likes: 0,
                hasLiked: false,
                replies: [],
              },
            ],
          }
        }
        return comment
      }),
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="w-full sm:container sm:max-w-lg mx-auto my-2 sm:my-4 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl shadow-xl overflow-hidden border border-zinc-700/50">
        <div className="flex flex-col h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)]">
          {/* Header */}
          <div className="p-3 sm:p-4 bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-zinc-700/50">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <div className="flex items-center gap-1 sm:gap-2">
                {post.type === "problem" ? (
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                ) : (
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                )}
                <span className="text-xs sm:text-sm font-medium text-yellow-500">
                  {post.type === "problem" ? "Problem" : "Project"}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg sm:text-xl font-bold text-white mb-2"
            >
              {post.title}
            </motion.h2>
            <div className="flex items-center gap-2">
              <Avatar className="w-5 h-5 sm:w-6 sm:h-6">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{post.author[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs sm:text-sm text-gray-300">{post.author}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Post content */}
              <div className="prose prose-sm prose-invert max-w-none">
                <p className="text-gray-300 text-sm leading-relaxed">{post.content}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-zinc-800 rounded-full text-xs text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post actions */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-700/50">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLike(post.id)}
                    className={`text-sm ${isLiked ? "text-yellow-500" : "text-gray-400"} hover:text-yellow-500`}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {post.likes + (isLiked ? 1 : 0)}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" className="text-sm text-gray-400 hover:text-yellow-500">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {comments.length}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" className="text-sm text-gray-400 hover:text-yellow-500">
                    <Share2 className="w-4 h-4 mr-2" />
                    {post.shares}
                  </Button>
                </motion.div>
              </div>

              <Separator className="my-4" />

              {/* Comments section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Comments</h3>

                {/* Comment input */}
                <div className="p-4 bg-zinc-800 border border-zinc-700 rounded-lg">
                  <form onSubmit={handleAddComment} className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-grow bg-zinc-700 border-zinc-600 text-white text-sm"
                    />
                    <Button type="submit" size="sm" className="bg-yellow-500 text-black hover:bg-yellow-600">
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>

                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onLike={handleLikeComment}
                    onAddReply={handleAddReply}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface CommentItemProps {
  comment: Comment
  onLike: (commentId: number) => void
  onAddReply: (commentId: number, replyText: string) => void
}

function CommentItem({ comment, onLike, onAddReply }: CommentItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState("")

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (replyText.trim()) {
      onAddReply(comment.id, replyText.trim())
      setReplyText("")
      setIsReplying(false)
      setIsExpanded(true)
    }
  }

  return (
    <div className="bg-zinc-800 rounded-lg p-3 space-y-2">
      <div className="flex items-start gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>{comment.user[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm text-gray-200">{comment.user}</span>
            <span className="text-xs text-gray-500">{comment.timestamp}</span>
          </div>
          <p className="mt-1 text-sm text-gray-300">{comment.text}</p>
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => onLike(comment.id)}
              className={`flex items-center gap-1 text-xs ${comment.hasLiked ? "text-yellow-500" : "text-gray-400"} hover:text-yellow-500`}
            >
              <ThumbsUp className="w-3 h-3" />
              {comment.likes > 0 && comment.likes} Like
            </button>
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-300"
            >
              <MessageCircle className="w-3 h-3" /> Reply
            </button>
          </div>
        </div>
      </div>
      {isReplying && (
        <form onSubmit={handleSubmitReply} className="mt-2 flex items-center gap-2">
          <Input
            type="text"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-grow bg-zinc-700 border-zinc-600 text-white text-xs"
          />
          <Button type="submit" size="sm" className="bg-yellow-500 text-black hover:bg-yellow-600 text-xs px-2 py-1">
            Reply
          </Button>
        </form>
      )}
      {comment.replies.length > 0 && (
        <div className="mt-2 pl-4 border-l border-zinc-700">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-gray-400 hover:text-gray-300 flex items-center"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3 h-3 mr-1" /> Hide Replies
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 mr-1" /> Show Replies ({comment.replies.length})
              </>
            )}
          </button>
          {isExpanded && (
            <div className="mt-2 space-y-2">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} onLike={onLike} onAddReply={onAddReply} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}


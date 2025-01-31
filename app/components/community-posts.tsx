'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ThumbsUp, Share2, Code2, Zap } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import PostDetails from './post-details'

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
  type: 'problem' | 'project'
  title: string
  author: string
  content: string
  likes: number
  comments: Comment[]
  shares: number
  tags: string[]
}

const posts: Post[] = [
  {
    id: 1,
    type: 'problem',
    title: 'Optimizing a recursive Fibonacci function',
    author: 'Alice Johnson',
    content: 'I\'m trying to optimize my recursive Fibonacci function. It works but it\'s very slow for large numbers. Any suggestions?',
    likes: 24,
    comments: [
      {
        id: 1,
        user: 'Bob Smith',
        text: 'Have you tried memoization? It can significantly improve the performance of recursive functions like Fibonacci.',
        timestamp: '2 hours ago',
        likes: 5,
        hasLiked: false,
        replies: []
      },
      {
        id: 2,
        user: 'Charlie Brown',
        text: 'Another approach could be using dynamic programming with an iterative solution. It\'s generally more efficient for larger numbers.',
        timestamp: '1 hour ago',
        likes: 3,
        hasLiked: false,
        replies: []
      }
    ],
    shares: 3,
    tags: ['recursion', 'optimization', 'algorithms']
  },
  {
    id: 2,
    type: 'project',
    title: 'Contributing to an open-source React component library',
    author: 'Bob Smith',
    content: 'I\'m working on contributing to a popular React component library. Looking for collaborators and advice on best practices.',
    likes: 56,
    comments: [
      {
        id: 3,
        user: 'Alice Johnson',
        text: 'That\'s exciting! Make sure to thoroughly read the contribution guidelines and start with small, manageable issues.',
        timestamp: '3 hours ago',
        likes: 8,
        hasLiked: false,
        replies: []
      }
    ],
    shares: 8,
    tags: ['open-source', 'react', 'ui-components']
  },
]

interface CommunityPostsProps {
  activeTab: string
}

export default function CommunityPosts({ activeTab }: CommunityPostsProps) {
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const filteredPosts = posts.filter(post => 
    activeTab === 'all' || 
    (activeTab === 'problems' && post.type === 'problem') ||
    (activeTab === 'projects' && post.type === 'project')
  )

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    )
  }

  const handleOpenPost = (post: Post) => {
    setSelectedPost(post)
  }

  const handleClosePost = () => {
    setSelectedPost(null)
  }

  return (
    <div className="space-y-4">
      {filteredPosts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-zinc-900 rounded-xl p-3 space-y-3 cursor-pointer"
          onClick={() => handleOpenPost(post)}
        >
          <div className="flex items-start gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-base">{post.title}</h3>
              <p className="text-xs text-gray-400">{post.author}</p>
            </div>
            {post.type === 'problem' ? (
              <Code2 className="w-4 h-4 text-purple-500" />
            ) : (
              <Zap className="w-4 h-4 text-emerald-500" />
            )}
          </div>
          <p className="text-xs text-gray-300 line-clamp-2">{post.content}</p>
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-2 py-0.5 bg-zinc-800 rounded-full text-xs text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleLike(post.id);
              }}
              className={`text-xs ${likedPosts.includes(post.id) ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              <ThumbsUp className="w-3 h-3 mr-1" />
              {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-gray-400">
              <MessageCircle className="w-3 h-3 mr-1" />
              {post.comments.length}
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-gray-400">
              <Share2 className="w-3 h-3 mr-1" />
              {post.shares}
            </Button>
          </div>
        </motion.div>
      ))}
      {selectedPost && (
        <PostDetails
          post={selectedPost}
          onClose={handleClosePost}
          onLike={handleLike}
          isLiked={likedPosts.includes(selectedPost.id)}
        />
      )}
    </div>
  )
}


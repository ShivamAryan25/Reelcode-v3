import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Search, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

interface User {
  id: string
  name: string
  avatar?: string
  isStarCreator: boolean
}

interface NewChatPopupProps {
  isOpen: boolean
  onClose: () => void
  onSelectUser: (user: User) => void
}

const suggestedUsers: User[] = [
  { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg", isStarCreator: true },
  { id: "2", name: "Bob Smith", avatar: "/placeholder.svg", isStarCreator: false },
  { id: "3", name: "Charlie Brown", avatar: "/placeholder.svg", isStarCreator: false },
  { id: "4", name: "Diana Ross", avatar: "/placeholder.svg", isStarCreator: true },
  { id: "5", name: "Ethan Hunt", avatar: "/placeholder.svg", isStarCreator: false },
]

export default function NewChatPopup({ isOpen, onClose, onSelectUser }: NewChatPopupProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = suggestedUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-end justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="bg-zinc-900 rounded-t-2xl w-full max-w-md h-3/4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-zinc-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">New Chat</h2>
                <button onClick={onClose} className="text-zinc-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-800 border-zinc-700 text-white pl-10 pr-4 py-2 rounded-full focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-5rem)]">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-4 hover:bg-zinc-800/50 cursor-pointer"
                  onClick={() => onSelectUser(user)}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    {user.isStarCreator && (
                      <p className="text-xs text-yellow-500 flex items-center gap-1">
                        <Star className="w-3 h-3" /> Star Creator
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  id: string
  name: string
  avatar?: string
  isStarCreator: boolean
}

interface UserSearchScreenProps {
  isOpen: boolean
  onClose: () => void
  onSelectUser: (user: User) => void
}

const mockUsers: User[] = [
  { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg", isStarCreator: true },
  { id: "2", name: "Bob Smith", avatar: "/placeholder.svg", isStarCreator: false },
  { id: "3", name: "Charlie Brown", avatar: "/placeholder.svg", isStarCreator: false },
  { id: "4", name: "Diana Ross", avatar: "/placeholder.svg", isStarCreator: true },
]

export default function UserSearchScreen({ isOpen, onClose, onSelectUser }: UserSearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers)

  useEffect(() => {
    setFilteredUsers(mockUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())))
  }, [searchQuery])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          className="fixed inset-x-0 bottom-0 z-50 bg-zinc-900 rounded-t-2xl shadow-lg"
          style={{ height: "60%" }}
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">New Message</h2>
              <button onClick={onClose} className="text-white/70 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800/50 border-zinc-700/50 text-white pl-10 pr-4 py-2 rounded-full focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 hover:bg-zinc-800/50 rounded-lg cursor-pointer"
                  onClick={() => onSelectUser(user)}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    {user.isStarCreator && <span className="text-xs text-yellow-500">Star Creator</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


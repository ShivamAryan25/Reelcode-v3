import { useState, useEffect, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Ghost, Trash2, BellOff, Pin } from "lucide-react"
import { AnimatePresence } from "framer-motion"
import StarCreatorBenefitsPopup from "./star-creator-benefits-popup"
import DeleteChatPopup from "./delete-chat-popup"
import { formatDistanceToNow } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"

const ChatSkeleton = () => (
  <div className="flex items-center gap-3 p-4">
    <Skeleton className="w-12 h-12 rounded-full" />
    <div className="flex-1">
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
)

interface Chat {
  id: string
  name: string
  lastMessage: string
  time: string
  avatar?: string
  isStarCreator: boolean
  isDeleted?: boolean
  unreadCount?: number
}

interface ChatListProps {
  chats?: Chat[]
  onSelectChat: (chatId: string) => void
  selectedChat: string | null
  onDeleteChat: (chatId: string) => void
  mutedChats: string[]
  pinnedChats: string[]
}

export default function ChatList({
  chats = [],
  onSelectChat,
  selectedChat,
  onDeleteChat,
  mutedChats,
  pinnedChats,
}: ChatListProps) {
  const [loading, setLoading] = useState(true)
  const [starCreatorPopupOpen, setStarCreatorPopupOpen] = useState(false)
  const [selectedStarCreator, setSelectedStarCreator] = useState<Chat | null>(null)
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleChatClick = useCallback(
    (chat: Chat) => {
      if (selectedChat) {
        setSelectedChat(null)
      } else {
        if (chat.isStarCreator && !chat.isDeleted) {
          setSelectedStarCreator(chat)
          setStarCreatorPopupOpen(true)
        } else {
          onSelectChat(chat.id)
        }
      }
    },
    [onSelectChat, selectedChat],
  )

  const handleLongPress = useCallback((chatId: string) => {
    setSelectedChat(chatId)
  }, [])

  const handleTouchStart = useCallback(
    (chatId: string) => {
      const timer = setTimeout(() => handleLongPress(chatId), 500)
      setLongPressTimer(timer)
    },
    [handleLongPress],
  )

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
    }
  }, [longPressTimer])

  useEffect(() => {
    return () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer)
      }
    }
  }, [longPressTimer])

  const handleDeleteConfirm = useCallback(() => {
    if (selectedChatId) {
      onDeleteChat(selectedChatId)
      setSelectedChatId(null)
      setShowDeletePopup(false)
    }
  }, [selectedChatId, onDeleteChat])

  const handleSubscribe = () => {
    console.log("Subscribed to", selectedStarCreator?.name)
    setStarCreatorPopupOpen(false)
    if (selectedStarCreator) {
      onSelectChat(selectedStarCreator.id)
    }
  }

  const sortedChats = chats.sort((a, b) => {
    if (pinnedChats.includes(a.id) && !pinnedChats.includes(b.id)) return -1
    if (!pinnedChats.includes(a.id) && pinnedChats.includes(b.id)) return 1
    return 0
  })

  return (
    <div className="divide-y divide-white/5">
      {loading ? (
        <>
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
        </>
      ) : (
        sortedChats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center gap-3 p-4 hover:bg-zinc-800/50 relative ${
              chat.isStarCreator && !chat.isDeleted ? "border-l-4 border-yellow-500" : ""
            } ${selectedChat === chat.id ? "bg-zinc-800" : ""}`}
            onClick={() => handleChatClick(chat)}
            onTouchStart={() => handleTouchStart(chat.id)}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex-shrink-0">
              <Avatar className="w-12 h-12 rounded-full">
                {chat.isDeleted ? (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <Ghost className="w-6 h-6 text-white/70" />
                  </div>
                ) : (
                  <>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </>
                )}
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium truncate flex items-center gap-1">
                  {chat.name}
                  {chat.isStarCreator && !chat.isDeleted && <Star className="w-4 h-4 text-yellow-500 inline" />}
                  {pinnedChats.includes(chat.id) && <Pin className="w-4 h-4 text-blue-500 inline" />}
                </h3>
                <span className="text-xs text-white/40 flex-shrink-0">{chat.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-white/50 truncate">
                  {mutedChats.includes(chat.id) && <BellOff className="w-3 h-3 text-yellow-500 inline mr-1" />}
                  {chat.lastMessage}
                </p>
                {chat.unreadCount && chat.unreadCount > 0 && (
                  <span className="ml-2 flex-shrink-0 w-5 h-5 bg-yellow-500 rounded-full text-black text-xs font-medium flex items-center justify-center">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      )}

      <StarCreatorBenefitsPopup
        isOpen={starCreatorPopupOpen}
        onClose={() => setStarCreatorPopupOpen(false)}
        onSubscribe={handleSubscribe}
        creatorName={selectedStarCreator?.name || ""}
        creatorAvatar={selectedStarCreator?.avatar || "/placeholder.svg"}
        price={9.99}
      />

      <DeleteChatPopup
        isOpen={showDeletePopup}
        onClose={() => {
          setShowDeletePopup(false)
          setSelectedChatId(null)
        }}
        onConfirm={handleDeleteConfirm}
      />

      {selectedChat && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 py-2 px-4 flex justify-end items-center gap-4">
          <button onClick={() => onDeleteChat(selectedChat)} className="text-red-500">
            <Trash2 className="w-6 h-6" />
          </button>
          <button className="text-yellow-500">
            <BellOff className="w-6 h-6" />
          </button>
          <button className="text-blue-500">
            <Pin className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  )
}


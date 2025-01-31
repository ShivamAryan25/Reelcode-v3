"use client"

import { useState, useCallback, useRef, useEffect, useMemo, Suspense } from "react"
import { ArrowLeft, Search, Edit2, ArrowDown, Bell } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ChatList from "../components/chat-list"
import ChatDetail from "../components/chat-detail"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import NewChatPopup from "../components/new-chat-popup"
import Head from "next/head"
import { useSwipeable } from "react-swipeable"

interface Chat {
  id: string
  name: string
  lastMessage: string
  time: string
  avatar?: string
  isStarCreator: boolean
  isDeleted?: boolean
  unreadCount?: number
  lastSeen?: string
  status?: "online" | "offline"
  phone?: string
}

function InboxContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const creatorId = searchParams.get("creatorId")
  const creatorName = searchParams.get("creatorName")

  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const refreshThreshold = 100
  const pullToRefreshRef = useRef<HTMLDivElement>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      time: "10:30 AM",
      avatar: "/placeholder.svg",
      isStarCreator: true,
      lastSeen: "last seen recently",
      status: "offline",
      phone: "+1 234 567 890",
    },
    {
      id: "2",
      name: "Alice Smith",
      lastMessage: "Thanks for the code review!",
      time: "2:15 PM",
      avatar: "/placeholder.svg",
      isStarCreator: false,
      unreadCount: 3,
      status: "online",
    },
    {
      id: "3",
      name: "Bob Smith",
      lastMessage: "Let's catch up soon!",
      time: "Yesterday",
      avatar: "/placeholder.svg",
      isStarCreator: false,
      status: "offline",
    },
  ])
  const [newChatPopupOpen, setNewChatPopupOpen] = useState(false)
  const [mutedChats, setMutedChats] = useState<string[]>([])
  const [pinnedChats, setPinnedChats] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handlePull = useCallback((e: TouchEvent) => {
    const pull = e.touches[0].clientY
    const el = pullToRefreshRef.current
    if (el) {
      el.style.transform = `translateY(${pull}px)`
    }
  }, [])

  const handleRelease = useCallback(() => {
    const el = pullToRefreshRef.current
    if (el) {
      el.style.transform = "translateY(0px)"
      if (Number.parseInt(el.style.transform) > refreshThreshold) {
        setIsRefreshing(true)
        // Simulate refresh
        setTimeout(() => {
          setIsRefreshing(false)
        }, 2000)
      }
    }
  }, [])

  useEffect(() => {
    document.addEventListener("touchmove", handlePull)
    document.addEventListener("touchend", handleRelease)
    return () => {
      document.removeEventListener("touchmove", handlePull)
      document.removeEventListener("touchend", handleRelease)
    }
  }, [handlePull, handleRelease])

  useEffect(() => {
    if (creatorId && creatorName) {
      const existingChat = chats.find((chat) => chat.id === creatorId)
      if (existingChat) {
        setSelectedChat(creatorId)
      } else {
        // Create a new chat
        const newChat: Chat = {
          id: creatorId,
          name: decodeURIComponent(creatorName),
          lastMessage: "Start a conversation!",
          time: "Now",
          avatar: "/placeholder.svg",
          isStarCreator: true,
          lastSeen: "last seen recently",
          status: "offline",
        }
        setChats((prevChats) => [...prevChats, newChat])
        setSelectedChat(creatorId)
      }
    }
  }, [creatorId, creatorName, chats])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedChatData = chats.find((chat) => chat.id === selectedChat)

  const handleDeleteChat = useCallback((chatId: string) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId))
    setSelectedChat(null)
  }, [])

  const handleMuteChat = useCallback((chatId: string) => {
    setMutedChats((prevMutedChats) =>
      prevMutedChats.includes(chatId) ? prevMutedChats.filter((id) => id !== chatId) : [...prevMutedChats, chatId],
    )
    setSelectedChat(null)
  }, [])

  const handlePinChat = useCallback((chatId: string) => {
    setPinnedChats((prevPinnedChats) =>
      prevPinnedChats.includes(chatId) ? prevPinnedChats.filter((id) => id !== chatId) : [...prevPinnedChats, chatId],
    )
    setSelectedChat(null)
  }, [])

  const handleProfileClick = () => {
    console.log("Navigating to profile page")
    router.push("/profile")
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (!selectedChat && filteredChats.length > 0) {
        setSelectedChat(filteredChats[0].id)
      }
    },
    onSwipedRight: () => {
      if (selectedChat) {
        setSelectedChat(null)
      }
    },
  })

  const memoizedChatList = useMemo(
    () => (
      <ChatList
        chats={filteredChats}
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
        onDeleteChat={handleDeleteChat}
        mutedChats={mutedChats}
        pinnedChats={pinnedChats}
      />
    ),
    [filteredChats, selectedChat, handleDeleteChat, mutedChats, pinnedChats],
  )

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div
        ref={pullToRefreshRef}
        className="absolute top-0 left-0 right-0 h-16 flex items-center justify-center text-yellow-500"
      >
        {isRefreshing ? <ArrowDown className="w-6 h-6 animate-bounce" /> : <ArrowDown className="w-6 h-6" />}
      </div>
      {!selectedChat && (
        <header className="sticky top-0 z-50 bg-zinc-900/90 backdrop-blur-md border-b border-white/5 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between h-16 px-4">
              <div className="flex items-center gap-3">
                {selectedChat ? (
                  <button onClick={() => setSelectedChat(null)} className="text-white/70 hover:text-white p-2">
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                ) : (
                  <Link href="/" passHref>
                    <Button variant="ghost" size="icon" className="text-white/70 hover:text-yellow-500">
                      <ArrowLeft className="w-6 h-6" />
                    </Button>
                  </Link>
                )}
                <h1 className="text-xl font-semibold">{selectedChat ? "Chat" : "Messages"}</h1>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative text-white/70 hover:text-yellow-500">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full text-xs flex items-center justify-center text-black font-medium">
                    3
                  </span>
                </button>
                <button onClick={handleProfileClick} className="text-white/70 hover:text-yellow-500">
                  <Avatar className="w-8 h-8 border-2 border-yellow-500">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className="max-w-4xl mx-auto" {...swipeHandlers}>
        {selectedChat ? (
          <ChatDetail
            chatId={selectedChat}
            onClose={() => setSelectedChat(null)}
            showInfo={showInfo}
            onInfoClose={() => setShowInfo(false)}
            chat={selectedChatData}
            onToggleInfo={() => setShowInfo(!showInfo)}
          />
        ) : (
          <>
            <div className="sticky top-16 z-40 bg-zinc-900/90 backdrop-blur-md p-4 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <Input
                  placeholder="Search messages..."
                  className="w-full bg-zinc-800/50 border-zinc-700/50 text-white pl-10 pr-4 py-2 rounded-full focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent text-sm"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
              </div>
            ) : (
              memoizedChatList
            )}
            <Button
              className="fixed right-4 bottom-20 w-12 h-12 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg"
              size="icon"
              onClick={() => setNewChatPopupOpen(true)}
            >
              <Edit2 className="w-5 h-5" />
            </Button>
          </>
        )}
        <NewChatPopup
          isOpen={newChatPopupOpen}
          onClose={() => setNewChatPopupOpen(false)}
          onSelectUser={(user) => {
            // Handle user selection here
            setChats((prevChats) => [
              ...prevChats,
              {
                id: user.id,
                name: user.name,
                lastMessage: "Start a conversation!",
                time: "Now",
                avatar: user.avatar,
                isStarCreator: user.isStarCreator,
                lastSeen: "last seen recently",
                status: "offline",
              },
            ])
            setNewChatPopupOpen(false)
          }}
        />
      </main>
    </div>
  )
}

export default function InboxPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InboxContent />
    </Suspense>
  )
}


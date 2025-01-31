import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Smile, Paperclip, Ghost, Bell, Phone, Video, X, ArrowDown, ArrowLeft, Info, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import ChatInfoSidebar from "./chat-info-sidebar"
import FullChatProfile from "./full-chat-profile"

interface Message {
  id: string
  text: string
  sender: "user" | "other"
  timestamp: string
  status: "sent" | "delivered" | "read"
}

interface Chat {
  id: string
  name: string
  lastSeen?: string
  avatar?: string
  isDeleted?: boolean
  status?: "online" | "offline"
  phone?: string
  creator?: {
    isStarCreator?: boolean
  }
}

interface ChatDetailProps {
  chatId: string
  onClose: () => void
  showInfo: boolean
  onInfoClose: () => void
  chat?: Chat
  onToggleInfo: () => void
}

const EmptyChat = ({ onSayHello }: { onSayHello: () => void }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
    <div className="w-32 h-32 bg-zinc-800 rounded-full mb-4 flex items-center justify-center overflow-hidden">
      <img src="/placeholder.svg" alt="No messages" className="w-24 h-24 object-cover" />
    </div>
    <h3 className="text-lg font-medium mb-2">No messages here yet...</h3>
    <p className="text-sm text-white/50 mb-4">Send a message or tap the greeting below.</p>
    <Button variant="outline" className="bg-zinc-800 text-white hover:bg-zinc-700" onClick={onSayHello}>
      Say Hello
    </Button>
  </div>
)

const MessageStatus = ({ status }: { status: Message["status"] }) => {
  if (status === "sent") return <Check className="w-3 h-3 text-white/40" />
  if (status === "delivered" || status === "read") {
    return (
      <div className="flex">
        <Check className={`w-3 h-3 ${status === "read" ? "text-yellow-500" : "text-white/40"}`} />
        <Check className={`w-3 h-3 -ml-1 ${status === "read" ? "text-yellow-500" : "text-white/40"}`} />
      </div>
    )
  }
  return null
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-2 p-3 bg-zinc-800 rounded-full max-w-[100px]">
    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
  </div>
)

const ChatInfo = ({ chat, onClose }: { chat?: Chat; onClose: () => void }) => (
  <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    className="absolute inset-y-0 right-0 w-80 bg-zinc-900 border-l border-white/5"
  >
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Info</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-20 h-20 mb-4">
          {chat?.isDeleted ? (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <Ghost className="w-10 h-10 text-white/70" />
            </div>
          ) : (
            <>
              <AvatarImage src={chat?.avatar} />
              <AvatarFallback>{chat?.name[0]}</AvatarFallback>
            </>
          )}
        </Avatar>
        <h3 className="text-lg font-medium">{chat?.name}</h3>
        <p className="text-sm text-white/50">{chat?.status === "online" ? "online" : chat?.lastSeen}</p>
      </div>

      {chat?.phone && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Phone</h4>
          <p className="text-sm text-white/50">{chat.phone}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-white/70" />
            <span className="text-sm">Notifications</span>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  </motion.div>
)

export default function ChatDetail({ chatId, onClose, showInfo, onInfoClose, chat, onToggleInfo }: ChatDetailProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [showFullProfile, setShowFullProfile] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const checkScroll = () => {
      const container = messagesEndRef.current?.parentElement
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container
        setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100)
      }
    }

    const container = messagesEndRef.current?.parentElement
    if (container) {
      container.addEventListener("scroll", checkScroll)
      return () => container.removeEventListener("scroll", checkScroll)
    }
  }, [])

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          text: newMessage,
          sender: "user",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: "sent",
        },
      ])
      setNewMessage("")

      // Simulate typing indicator
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        // Simulate reply
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "Thanks for your message! I'll get back to you soon.",
            sender: "other",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: "read",
          },
        ])
      }, 3000)

      // Simulate message being delivered and read
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === Date.now().toString() ? { ...msg, status: "delivered" } : msg)),
        )
      }, 1000)

      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === Date.now().toString() ? { ...msg, status: "read" } : msg)))
      }, 2000)
    }
  }

  const handleSayHello = () => {
    const helloMessage: Message = {
      id: Date.now().toString(),
      text: "Hello",
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    }
    setMessages([helloMessage])
  }

  const handleHeaderTap = () => {
    setShowFullProfile(true)
  }

  return (
    <div className="relative flex h-screen">
      <div className="flex-1 flex flex-col">
        <header
          className="absolute top-0 left-0 right-0 z-50 bg-zinc-900/90 backdrop-blur-md border-b border-white/5 px-4 py-2 cursor-pointer"
          onClick={handleHeaderTap}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:text-yellow-500">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src={chat?.avatar || "/placeholder.svg"} alt={chat?.name} />
                <AvatarFallback>{chat?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-sm font-semibold">{chat?.name}</h2>
                <p className="text-xs text-white/50">
                  {chat?.status === "online" ? "Online" : `Last seen ${chat?.lastSeen}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-yellow-500">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-yellow-500">
                <Video className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleInfo}
                className="text-white/70 hover:text-yellow-500"
              >
                <Info className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto bg-zinc-900/50 pt-16 pb-20">
          {messages.length === 0 ? (
            <EmptyChat onSayHello={handleSayHello} />
          ) : (
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-3 ${
                      message.sender === "user" ? "bg-yellow-500 text-black" : "bg-zinc-800 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs opacity-70">{message.timestamp}</span>
                      {message.sender === "user" && (
                        <div className="ml-1">
                          <MessageStatus status={message.status} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-start"
                >
                  <TypingIndicator />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {showScrollButton && (
          <Button
            onClick={scrollToBottom}
            className="absolute bottom-20 right-4 rounded-full w-10 h-10 bg-yellow-500 text-black hover:bg-yellow-600"
          >
            <ArrowDown className="w-5 h-5" />
          </Button>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-zinc-900 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-yellow-500">
              <Smile className="w-5 h-5" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1 bg-zinc-800/50 border-zinc-700/50 text-white rounded-full focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            {newMessage.trim() ? (
              <Button
                onClick={handleSendMessage}
                className="bg-yellow-500 text-black hover:bg-yellow-600 rounded-full w-10 h-10 p-0"
              >
                <Send className="w-5 h-5" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-yellow-500">
                <Paperclip className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
        {showFullProfile && (
          <FullChatProfile
            chat={chat}
            onClose={() => setShowFullProfile(false)}
            isStarCreator={chat?.creator?.isStarCreator}
          />
        )}
      </div>
      {showInfo && <ChatInfoSidebar chat={chat} onClose={onInfoClose} />}
    </div>
  )
}


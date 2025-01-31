import { useState } from "react"
import { motion } from "framer-motion"
import { X, Bell, TrendingUp, Code, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: "activity" | "trending" | "problem" | "creator" | "comment"
  title: string
  description: string
  time: string
  isCreator: boolean
}

interface NotificationScreenProps {
  onClose: () => void
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "activity",
    title: "New follower",
    description: "CodeMaster123 started following you",
    time: "2 minutes ago",
    isCreator: false,
  },
  {
    id: "2",
    type: "trending",
    title: "Trending Reel",
    description: '"10 JavaScript Tips" is trending now',
    time: "1 hour ago",
    isCreator: false,
  },
  {
    id: "3",
    type: "problem",
    title: "New Coding Problem",
    description: 'Can you solve "Binary Tree Traversal"?',
    time: "3 hours ago",
    isCreator: false,
  },
  {
    id: "4",
    type: "creator",
    title: "Emerging Creator",
    description: "Check out ReactNinja's latest tutorials",
    time: "1 day ago",
    isCreator: false,
  },
  {
    id: "5",
    type: "comment",
    title: "New comment on your reel",
    description: 'User123 commented: "Great tutorial!"',
    time: "30 minutes ago",
    isCreator: false,
  },
  {
    id: "6",
    type: "comment",
    title: "Creator commented on their reel",
    description: 'ReactNinja replied: "Thanks for watching!"',
    time: "1 hour ago",
    isCreator: true,
  },
]

export default function NotificationScreen({ onClose }: NotificationScreenProps) {
  const [notifications, setNotifications] = useState(initialNotifications)

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "activity":
        return <Bell className="w-6 h-6 text-yellow-500" />
      case "trending":
        return <TrendingUp className="w-6 h-6 text-yellow-500" />
      case "problem":
        return <Code className="w-6 h-6 text-yellow-500" />
      case "creator":
        return <Star className="w-6 h-6 text-yellow-500" />
      case "comment":
        return <MessageCircle className="w-6 h-6 text-yellow-500" />
    }
  }

  const getBackgroundColor = (type: Notification["type"], isCreator: boolean) => {
    if (isCreator) return "bg-yellow-500/20 border-yellow-500"
    switch (type) {
      case "activity":
        return "bg-blue-500/10 border-blue-500/50"
      case "trending":
        return "bg-green-500/10 border-green-500/50"
      case "problem":
        return "bg-purple-500/10 border-purple-500/50"
      case "creator":
      case "comment":
        return "bg-zinc-800/50 border-zinc-700"
    }
  }

  const handleViewNotification = (notification: Notification) => {
    // TODO: Implement the view action based on the notification type
    console.log(`Viewing notification: ${notification.title}`)
    // You can add more logic here, such as navigating to a specific page or opening a modal
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 500 }}
      className="fixed inset-0 bg-zinc-900 z-50 flex flex-col"
    >
      <div className="flex flex-col h-full">
        <div className="sticky top-0 bg-zinc-900 z-10 border-b border-zinc-800">
          <div className="flex justify-between items-center py-4 px-4">
            <h2 className="text-2xl font-bold text-yellow-500">Notifications</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:text-yellow-500">
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4 mb-6">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${getBackgroundColor(notification.type, notification.isCreator)} rounded-xl p-4 flex items-start gap-4 border`}
              >
                <div className="mt-1 bg-zinc-700 p-2 rounded-full">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-lg">{notification.title}</h3>
                    {notification.isCreator && (
                      <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">Creator</span>
                    )}
                  </div>
                  <p className="text-white/70 mt-1">{notification.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-white/50">{notification.time}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-yellow-500 hover:text-yellow-400"
                      onClick={() => handleViewNotification(notification)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Button
            className="w-full bg-yellow-500 text-black hover:bg-yellow-600 rounded-full"
            onClick={() => setNotifications([])}
          >
            Clear All Notifications
          </Button>
        </div>
      </div>
    </motion.div>
  )
}


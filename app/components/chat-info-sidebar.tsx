import { X, Bell, Trash2, Flag } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface ChatInfoSidebarProps {
  chat: Chat
  onClose: () => void
}

export default function ChatInfoSidebar({ chat, onClose }: ChatInfoSidebarProps) {
  return (
    <div className="fixed inset-0 bg-zinc-900 z-50 overflow-y-auto">
      <div className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center pt-12">
          <div className="flex justify-center items-center">
            <h2 className="text-xl font-semibold">Chat Info</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4">
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={chat.avatar} />
            <AvatarFallback>{chat.name[0]}</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold">{chat.name}</h3>
          <p className="text-sm text-white/50">{chat.status === "online" ? "Online" : `Last seen ${chat.lastSeen}`}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-white/70" />
              <span className="text-sm">Mute notifications</span>
            </div>
            <Switch />
          </div>

          <Button
            variant="outline"
            className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete chat
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10"
          >
            <Flag className="w-4 h-4 mr-2" />
            Report
          </Button>
        </div>
      </div>
    </div>
  )
}


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star, MessageCircle } from "lucide-react"
import Image from "next/image"

interface PremiumChatDialogProps {
  isOpen: boolean
  onClose: () => void
  onPurchase: () => void
  creatorName: string
  creatorAvatar: string
  price: number
}

export default function PremiumChatDialog({
  isOpen,
  onClose,
  onPurchase,
  creatorName,
  creatorAvatar,
  price,
}: PremiumChatDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white border border-yellow-500/20 rounded-2xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Chat with <span className="text-yellow-500">{creatorName}</span>
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
            Unlock exclusive access to chat directly with this star creator
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center py-6 space-y-4">
          <div className="relative">
            <Image
              src={creatorAvatar || "/placeholder.svg"}
              alt={creatorName}
              width={100}
              height={100}
              className="rounded-full border-2 border-yellow-500"
            />
            <Star className="absolute bottom-0 right-0 w-6 h-6 text-yellow-500 bg-zinc-900 rounded-full p-1" />
          </div>
          <p className="text-3xl font-bold text-yellow-500">${price.toFixed(2)}</p>
          <p className="text-sm text-zinc-400">One-time fee for unlimited chat access</p>
        </div>
        <DialogFooter className="flex flex-col space-y-2">
          <Button onClick={onPurchase} className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
            <MessageCircle className="w-4 h-4 mr-2" />
            Start Chatting Now
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700"
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


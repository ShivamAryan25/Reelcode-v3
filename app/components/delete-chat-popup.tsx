import { motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeleteChatPopupProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteChatPopup({ isOpen, onClose, onConfirm }: DeleteChatPopupProps) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-zinc-800 rounded-lg p-6 w-80 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-4">Delete Chat</h2>
        <p className="text-white/70 mb-6">Are you sure you want to delete this chat? This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700"
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}


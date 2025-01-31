import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface NewChatDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreateChat: (newChat: {
    id: string
    name: string
    lastMessage: string
    time: string
    isStarCreator: boolean
  }) => void
}

export default function NewChatDialog({ isOpen, onClose, onCreateChat }: NewChatDialogProps) {
  const [newChatName, setNewChatName] = useState("")

  const handleCreateChat = () => {
    if (newChatName.trim()) {
      onCreateChat({
        id: Date.now().toString(),
        name: newChatName.trim(),
        lastMessage: "Start a conversation!",
        time: "Now",
        isStarCreator: false,
      })
      setNewChatName("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-800">
        <DialogHeader>
          <DialogTitle>New Chat</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Enter chat name"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white"
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateChat}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


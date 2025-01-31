import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MessageCircle, Video, Code, FileText } from "lucide-react"

interface StarCreatorBenefitsPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubscribe: () => void
  creatorName: string
  creatorAvatar: string
  price: number
}

export default function StarCreatorBenefitsPopup({
  isOpen,
  onClose,
  onSubscribe,
  creatorName,
  creatorAvatar,
  price,
}: StarCreatorBenefitsPopupProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const benefits = [
    {
      title: "Exclusive Chat Access",
      description: "Get direct access to chat with the star creator and receive personalized advice.",
      icon: <MessageCircle className="w-8 h-8 text-yellow-500" />,
    },
    {
      title: "Priority Q&A Sessions",
      description: "Participate in exclusive Q&A sessions with priority for your questions.",
      icon: <Video className="w-8 h-8 text-yellow-500" />,
    },
    {
      title: "Code Reviews",
      description: "Get your code reviewed by the star creator for expert feedback.",
      icon: <Code className="w-8 h-8 text-yellow-500" />,
    },
    {
      title: "Exclusive Content",
      description: "Access premium tutorials and resources created by the star creator.",
      icon: <FileText className="w-8 h-8 text-yellow-500" />,
    },
  ]

  const handleNext = () => {
    if (currentStep < benefits.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onSubscribe()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white border border-yellow-500/20 rounded-2xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Chat with <span className="text-yellow-500">{creatorName}</span>
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
            Unlock exclusive benefits by subscribing
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center py-6 space-y-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={creatorAvatar} />
            <AvatarFallback>{creatorName[0]}</AvatarFallback>
          </Avatar>
          <div className="relative">
            <Star className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500" />
          </div>
        </div>
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">{benefits[currentStep].title}</h3>
          <p className="text-zinc-400">{benefits[currentStep].description}</p>
          <div className="mt-4">{benefits[currentStep].icon}</div>
        </div>
        <div className="flex justify-center mb-4">
          {benefits.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${index === currentStep ? "bg-yellow-500" : "bg-zinc-600"}`}
            />
          ))}
        </div>
        <DialogFooter className="flex flex-col space-y-2">
          <Button onClick={handleNext} className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
            {currentStep < benefits.length - 1 ? "Next" : `Subscribe for $${price.toFixed(2)}/month`}
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


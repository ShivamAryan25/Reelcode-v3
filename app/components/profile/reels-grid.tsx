import { Play } from "lucide-react"

const reels = [
  { id: 1, thumbnail: "/placeholder.svg?height=200&width=200", views: 1200 },
  { id: 2, thumbnail: "/placeholder.svg?height=200&width=200", views: 980 },
  { id: 3, thumbnail: "/placeholder.svg?height=200&width=200", views: 1500 },
  { id: 4, thumbnail: "/placeholder.svg?height=200&width=200", views: 750 },
  { id: 5, thumbnail: "/placeholder.svg?height=200&width=200", views: 2100 },
  { id: 6, thumbnail: "/placeholder.svg?height=200&width=200", views: 1800 },
]

export default function ReelsGrid() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {reels.map((reel) => (
        <div key={reel.id} className="aspect-square bg-zinc-800 rounded-xl overflow-hidden relative group">
          <img
            src={reel.thumbnail || "/placeholder.svg"}
            alt={`Reel ${reel.id}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-8 h-8 text-white" />
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-xs">
            {reel.views} views
          </div>
        </div>
      ))}
    </div>
  )
}


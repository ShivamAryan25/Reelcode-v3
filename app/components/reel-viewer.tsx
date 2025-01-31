import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { UserPlus } from "lucide-react"

interface ReelViewerProps {
  reel: {
    id: number
    title: string
    creator: {
      id: string
      name: string
      isStarCreator: boolean
    }
    creatorAvatar?: string
    description: string
    episodes: number
    followers: string
    videoUrl: string
  }
  isActive: boolean
  isPlaying: boolean
  onPlayPause: () => void
  onFollow?: (creatorId: string) => void
  isFollowed: boolean
  children?: React.ReactNode
}

export default function ReelViewer({
  reel,
  isActive,
  isPlaying,
  onPlayPause,
  onFollow,
  isFollowed,
  children,
}: ReelViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showFullDescription, setShowFullDescription] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isActive, isPlaying])

  return (
    <div className="relative h-full w-full bg-black">
      {reel.videoUrl ? (
        <video ref={videoRef} src={reel.videoUrl} className="h-full w-full object-cover" loop playsInline />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-zinc-900">
          <p className="text-xl text-white">No video available</p>
        </div>
      )}

      {/* Play/Pause button */}
      <button
        onClick={onPlayPause}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 rounded-full p-4 transition-opacity duration-300 opacity-0 hover:opacity-100"
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>

      {/* Creator info at top */}
      <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-yellow-500">
              <img
                src={reel.creatorAvatar || "/placeholder.svg"}
                alt={reel.creator.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-0">
              <h3 className="font-semibold text-sm">{reel.creator.name}</h3>
              <div className="flex items-center gap-1 text-xs text-white/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <span>{reel.followers} followers</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (typeof onFollow === "function") {
                  onFollow(reel.creator.id)
                }
              }}
              className={`p-2 rounded-full ${
                isFollowed
                  ? "bg-yellow-500 text-black hover:bg-yellow-600"
                  : "bg-zinc-800/50 text-white hover:bg-zinc-700/50"
              } transition-colors`}
              aria-label={isFollowed ? "Unfollow creator" : "Follow creator"}
            >
              <UserPlus className="w-4 h-4" />
              <span className="sr-only">{isFollowed ? "Unfollow" : "Follow"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent pb-20">
        <div className="p-3 space-y-1">
          <h2 className="text-lg font-bold line-clamp-1">{reel.title}</h2>
          <p className={`text-xs text-white/90 ${showFullDescription ? "" : "line-clamp-2"}`}>{reel.description}</p>
          {reel.description.length > 100 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-xs text-yellow-500 hover:underline focus:outline-none"
            >
              {showFullDescription ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>

      {children}
    </div>
  )
}


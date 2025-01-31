"use client"

import { useState } from "react"
import { X, ImageIcon, Video, PlusCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface CreatePostWindowProps {
  type: "problem" | "project"
  onClose: () => void
}

export default function CreatePostWindow({ type, onClose }: CreatePostWindowProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [images, setImages] = useState<File[]>([])
  const [video, setVideo] = useState<File | null>(null)
  const [isPollActive, setIsPollActive] = useState(false)
  const [pollOptions, setPollOptions] = useState(["", ""])

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      setTags([...tags, e.currentTarget.value])
      e.currentTarget.value = ""
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)])
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0])
    }
  }

  const handleAddPollOption = () => {
    setPollOptions([...pollOptions, ""])
  }

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions]
    newOptions[index] = value
    setPollOptions(newOptions)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ title, description, tags, images, video, isPollActive, pollOptions })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-zinc-900 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New {type === "problem" ? "Problem" : "Project"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white h-32"
          />
          <div>
            <Input
              placeholder="Add tags (press Enter)"
              onKeyDown={handleAddTag}
              className="bg-zinc-800 border-zinc-700 text-white mb-2"
            />
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="bg-zinc-700 text-white px-2 py-1 rounded-full text-sm">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-gray-400 hover:text-white">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => document.getElementById("image-upload")?.click()}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Add Images
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              type="button"
              onClick={() => document.getElementById("video-upload")?.click()}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700"
            >
              <Video className="w-4 h-4 mr-2" />
              Add Video
            </Button>
            <input id="video-upload" type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
          </div>
          {(images.length > 0 || video) && (
            <div className="space-y-2">
              {images.map((image, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{image.name}</span>
                </div>
              ))}
              {video && (
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{video.name}</span>
                </div>
              )}
            </div>
          )}
          <div>
            <Button
              type="button"
              onClick={() => setIsPollActive(!isPollActive)}
              className="bg-zinc-800 hover:bg-zinc-700 mb-2"
            >
              {isPollActive ? "Remove Poll" : "Add Poll"}
            </Button>
            {isPollActive && (
              <div className="space-y-2">
                {pollOptions.map((option, index) => (
                  <Input
                    key={index}
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handlePollOptionChange(index, e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                ))}
                <Button type="button" onClick={handleAddPollOption} className="w-full bg-zinc-800 hover:bg-zinc-700">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>
            )}
          </div>
          <Button type="submit" className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
            Create {type === "problem" ? "Problem" : "Project"}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  )
}


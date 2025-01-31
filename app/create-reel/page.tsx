"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Upload, Clock, Tag, ImageIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CreateReelPage() {
  const [duration, setDuration] = useState<string>("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [video, setVideo] = useState<File | null>(null)

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      setTags([...tags, e.currentTarget.value])
      e.currentTarget.value = ""
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0])
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ duration, title, description, tags, thumbnail, video })
    // Reset form or navigate to another page after successful submission
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5 p-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white/70 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-semibold">Create CodeReel</h1>
          <div className="w-6 h-6" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-zinc-900/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-yellow-500">CodeReel Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Duration</label>
                <Select onValueChange={setDuration}>
                  <SelectTrigger className="bg-zinc-800/50 border-zinc-700/50 text-white">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="90">90 seconds</SelectItem>
                    <SelectItem value="120">120 seconds</SelectItem>
                    <SelectItem value="180">180 seconds</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Title</label>
                <Input
                  placeholder="Enter CodeReel title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Description</label>
                <Textarea
                  placeholder="Describe your CodeReel"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700/50 text-white h-32"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-yellow-500">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Add tags (press Enter)"
                onKeyDown={handleAddTag}
                className="bg-zinc-800/50 border-zinc-700/50 text-white"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-zinc-800/50 text-white px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-white/50 hover:text-white">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-yellow-500">Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Thumbnail</label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    onClick={() => document.getElementById("thumbnail-upload")?.click()}
                    className="bg-zinc-800/50 hover:bg-zinc-700/50"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Choose Thumbnail
                  </Button>
                  <input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                  />
                  {thumbnail && <span className="text-sm text-white/70">{thumbnail.name}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Upload Video</label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    onClick={() => document.getElementById("video-upload")?.click()}
                    className="bg-zinc-800/50 hover:bg-zinc-700/50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload CodeReel
                  </Button>
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                  {video && <span className="text-sm text-white/70">{video.name}</span>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
            Post CodeReel
          </Button>
        </form>
      </main>
    </div>
  )
}


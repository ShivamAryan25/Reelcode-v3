import { useState } from "react"
import { X, File, Star, Code, Video, Phone, VideoIcon, Info, ChevronRight, Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface FullChatProfileProps {
  chat: any // Replace with proper chat type
  onClose: () => void
  isStarCreator: boolean
}

export default function FullChatProfile({ chat = {}, onClose, isStarCreator }: FullChatProfileProps) {
  const [activeTab, setActiveTab] = useState("media")

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-zinc-900 w-full h-full md:h-auto md:max-h-[80vh] md:w-[480px] md:rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center gap-4 bg-zinc-800">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
            <X className="w-6 h-6" />
          </Button>
          <h2 className="text-xl font-semibold text-white">Contact info</h2>
        </div>

        <ScrollArea className="flex-grow">
          <div className="p-4 space-y-6">
            {/* Profile Info */}
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={chat.avatar} />
                <AvatarFallback>{(chat.name || "U")[0]}</AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-semibold text-white">{chat.name || "User"}</h3>
              <p className="text-sm text-zinc-400">@{chat.username || "username"}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button variant="ghost" size="icon" className="flex flex-col items-center">
                <Phone className="w-6 h-6 mb-1" />
                <span className="text-xs">Audio</span>
              </Button>
              <Button variant="ghost" size="icon" className="flex flex-col items-center">
                <VideoIcon className="w-6 h-6 mb-1" />
                <span className="text-xs">Video</span>
              </Button>
              <Button variant="ghost" size="icon" className="flex flex-col items-center">
                <Info className="w-6 h-6 mb-1" />
                <span className="text-xs">Info</span>
              </Button>
            </div>

            <Separator />

            {/* Media, Files, and Links */}
            <div>
              <h4 className="text-sm font-medium text-zinc-400 mb-2">Media, files and links</h4>
              <Button
                variant="ghost"
                className="w-full justify-between hover:bg-zinc-800 transition-colors"
                onClick={() => setActiveTab("media")}
              >
                <span>Media</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-between hover:bg-zinc-800 transition-colors"
                onClick={() => setActiveTab("files")}
              >
                <span>Files</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-between hover:bg-zinc-800 transition-colors"
                onClick={() => setActiveTab("links")}
              >
                <span>Links</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <Separator />

            {/* Starred Messages */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between hover:bg-zinc-800 transition-colors"
                onClick={() => setActiveTab("starred")}
              >
                <span>Starred messages</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <Separator />

            {/* Projects and Sessions */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between hover:bg-zinc-800 transition-colors"
                onClick={() => setActiveTab("projects")}
              >
                <span>Shared projects</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-between hover:bg-zinc-800 transition-colors"
                onClick={() => setActiveTab("sessions")}
              >
                <span>Live sessions</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {isStarCreator && (
              <>
                <Separator />
                <div className="bg-yellow-500/10 p-4 rounded-lg">
                  <h4 className="text-yellow-500 font-semibold mb-2">Star Creator Chat</h4>
                  <p className="text-sm text-zinc-400">
                    You've chatted with {chat.name} {chat.starCreatorChats} times.
                  </p>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        {/* Content based on active tab */}
        <ScrollArea className="flex-grow">
          <div className="p-4">
            {activeTab === "media" && <MediaGrid media={chat.media} />}
            {activeTab === "files" && <FilesList files={chat.sharedFiles} />}
            {activeTab === "links" && <LinksList links={chat.sharedLinks} />}
            {activeTab === "starred" && <StarredMessages messages={chat.starredMessages} />}
            {activeTab === "projects" && <ProjectsList projects={chat.sharedProjects} />}
            {activeTab === "sessions" && <SessionsList sessions={chat.liveSessions} />}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

function MediaGrid({ media = [] }) {
  if (!media || media.length === 0) {
    return <p className="text-sm text-zinc-400">No media shared yet.</p>
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {media.map((item, index) => (
        <div key={index} className="aspect-square bg-zinc-800 rounded overflow-hidden">
          <img
            src={item.url || "/placeholder.svg"}
            alt={`Shared media ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

function FilesList({ files = [] }) {
  if (!files || files.length === 0) {
    return <p className="text-sm text-zinc-400">No shared files yet.</p>
  }

  return (
    <ul className="space-y-2">
      {files.map((file, index) => (
        <li key={index} className="flex items-center gap-2 p-2 bg-zinc-800 rounded">
          <File className="w-4 h-4 text-zinc-400" />
          <span className="text-sm text-white">{file.name}</span>
        </li>
      ))}
    </ul>
  )
}

function LinksList({ links = [] }) {
  if (!links || links.length === 0) {
    return <p className="text-sm text-zinc-400">No shared links yet.</p>
  }

  return (
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index} className="p-2 bg-zinc-800 rounded">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-yellow-500 hover:underline"
          >
            {link.title || link.url}
          </a>
        </li>
      ))}
    </ul>
  )
}

function StarredMessages({ messages = [] }) {
  if (!messages || messages.length === 0) {
    return <p className="text-sm text-zinc-400">No starred messages yet.</p>
  }

  return (
    <ul className="space-y-2">
      {messages.map((message, index) => (
        <li key={index} className="p-2 bg-zinc-800 rounded">
          <p className="text-sm text-white">{message.content}</p>
          <p className="text-xs text-zinc-400 mt-1">{message.timestamp}</p>
        </li>
      ))}
    </ul>
  )
}

function ProjectsList({ projects = [] }) {
  if (!projects || projects.length === 0) {
    return <p className="text-sm text-zinc-400">No shared projects yet.</p>
  }

  return (
    <ul className="space-y-2">
      {projects.map((project, index) => (
        <li key={index} className="flex items-center gap-2 p-2 bg-zinc-800 rounded">
          <Code className="w-4 h-4 text-zinc-400" />
          <span className="text-sm text-white">{project.name}</span>
        </li>
      ))}
    </ul>
  )
}

function SessionsList({ sessions = [] }) {
  if (!sessions || sessions.length === 0) {
    return <p className="text-sm text-zinc-400">No live sessions attended yet.</p>
  }

  return (
    <ul className="space-y-2">
      {sessions.map((session, index) => (
        <li key={index} className="flex items-center gap-2 p-2 bg-zinc-800 rounded">
          <Video className="w-4 h-4 text-zinc-400" />
          <div>
            <span className="text-sm text-white">{session.title}</span>
            <span className="text-xs text-zinc-400 block">{session.date}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}


"use client"

import { useState } from "react"
import { ArrowLeft, Edit2, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import BottomNav from "../components/bottom-nav"
import ReelsGrid from "../components/profile/reels-grid"
import LiveSessions from "../components/profile/live-sessions"
import Projects from "../components/profile/projects"
import Contributions from "../components/profile/contributions"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("reels")
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Failed to log out. Please try again.")
    }
  }

  const handleEditProfile = () => {
    setIsEditProfileOpen(true)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "reels":
        return <ReelsGrid />
      case "live-sessions":
        return <LiveSessions />
      case "projects":
        return <Projects />
      case "contributions":
        return <Contributions />
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between p-3 max-w-2xl mx-auto">
          <Link href="/" className="text-white/70 hover:text-yellow-500 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-semibold">Profile</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-yellow-500">
                <Settings className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
              <DropdownMenuItem className="text-white hover:bg-zinc-800">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-white hover:bg-zinc-800">
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{user?.user_metadata?.full_name || "User"}</h2>
            <p className="text-sm text-white/70">{user?.email}</p>
          </div>
        </div>
        <p className="text-sm mb-4">
          {user?.user_metadata?.bio || "Full-stack developer passionate about creating innovative solutions."}
        </p>
        <div className="flex gap-4 mb-6">
          <div>
            <span className="font-bold">250</span>
            <span className="text-sm text-white/70 ml-1">Following</span>
          </div>
          <div>
            <span className="font-bold">10.5K</span>
            <span className="text-sm text-white/70 ml-1">Followers</span>
          </div>
          <div>
            <span className="font-bold">50</span>
            <span className="text-sm text-white/70 ml-1">Reels</span>
          </div>
        </div>
        <Button
          className="w-full bg-yellow-500 text-black hover:bg-yellow-600 rounded-full border-none"
          onClick={handleEditProfile}
        >
          <Edit2 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar">
            {["Reels", "Live Sessions", "Projects", "Contributions"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.toLowerCase().replace(" ", "-")
                    ? "bg-yellow-500 text-black rounded-full"
                    : "text-zinc-400 hover:text-yellow-500 hover:bg-zinc-800 rounded-full"
                }`}
                onClick={() => setActiveTab(tab.toLowerCase().replace(" ", "-"))}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-4 max-h-[calc(100vh-300px)] overflow-y-auto">{renderContent()}</div>
      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
      <BottomNav />
    </main>
  )
}

function EditProfileModal({ isOpen, onClose }) {
  const [username, setUsername] = useState("John Doe")
  const [bio, setBio] = useState("Full-stack developer passionate about creating innovative solutions.")
  const [avatar, setAvatar] = useState("/placeholder.svg")

  const handleSave = () => {
    // Implement save logic here
    console.log("Saving profile changes:", { username, bio, avatar })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 rounded-md"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setAvatar(URL.createObjectURL(e.target.files[0]))}
              className="w-full px-3 py-2 bg-zinc-800 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-yellow-500 text-black hover:bg-yellow-600 border-none">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}


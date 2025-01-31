"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Bell, User, Code } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import BottomNav from "./components/bottom-nav"
import CreatorGrid from "./components/creator-grid"
import CommunityGrid from "./components/community-grid"
import SponsorBanner from "./components/sponsor-banner"
import UpcomingFeatures from "./components/upcoming-features"
import PromotionCard from "./components/promotion-card"
import RewardsSection from "./components/rewards-section"
import Navigation from "./components/navigation"
import SearchSidebar from "./components/search-sidebar"
import NotificationScreen from "./components/notification-screen" // Import the NotificationScreen component
import { useAuth } from "./contexts/AuthContext" // Added import

export default function Home() {
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(45)
  const [isNotificationScreenOpen, setIsNotificationScreenOpen] = useState(false) // Added state for notification screen

  const { getCurrentSession } = useAuth() // Added useAuth hook

  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getCurrentSession() // Updated to use getCurrentSession
        if (!session) {
          router.push("/onboarding")
        }
      } catch (error) {
        console.error("Auth error:", error)
        router.push("/onboarding")
      }
    }

    checkAuth()
  }, [router]) // Updated useEffect dependency array

  const handleNotificationClick = () => {
    setIsNotificationScreenOpen(true) // Updated to open notification screen
    if (notificationCount > 0) {
      setNotificationCount(0)
    }
  }

  const handleTabChange = (tab: string) => {
    setIsLoading(true)
    setActiveTab(tab)
    setTimeout(() => setIsLoading(false), 100) // Minimal delay for smoother transition
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full shadow-sm overflow-hidden">
              <span className="text-black font-bold text-sm">RC</span>
            </div>
            <span className="font-playfair text-base text-white">ReelCode</span>
            <Link href="/reelcode" className="text-white/70 hover:text-yellow-500 transition-colors">
              <Code className="w-5 h-5" />
            </Link>
            <div className="relative flex-1 max-w-[180px]">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
              <Input
                placeholder="Search..."
                className="w-full bg-white/5 border-transparent rounded-full pl-7 pr-3 py-1 focus:ring-1 focus:ring-yellow-500/50 h-7 text-xs text-white placeholder:text-gray-500"
                onFocus={() => setIsSearchOpen(true)}
              />
            </div>
            <button
              className="relative text-white/70 hover:text-yellow-500 transition-colors"
              onClick={handleNotificationClick}
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full text-[8px] flex items-center justify-center text-black font-medium">
                  {notificationCount}
                </span>
              )}
            </button>
            <Link href="/profile" className="text-white/70 hover:text-yellow-500 transition-colors">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="px-3 pt-3">
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} isLoading={isLoading} />
      </div>

      {/* Main Content */}
      <div
        className={`max-w-4xl mx-auto p-3 pb-24 space-y-8 transition-opacity duration-200 ${isLoading ? "opacity-50" : "opacity-100"}`}
      >
        <PromotionCard />
        <RewardsSection />
        <CreatorGrid />
        <CommunityGrid />
        <SponsorBanner />
        <UpcomingFeatures />
        {isNotificationScreenOpen && ( // Added NotificationScreen component
          <NotificationScreen onClose={() => setIsNotificationScreenOpen(false)} />
        )}
      </div>

      <BottomNav />

      {/* Search Sidebar */}
      <SearchSidebar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </main>
  )
}


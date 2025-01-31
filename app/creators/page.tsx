"use client"

import { useState } from "react"
import { Search, Bell, User, Code } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import BottomNav from "../components/bottom-nav"
import Navigation from "../components/navigation"
import SearchSidebar from "../components/search-sidebar"
import FeaturedCreator from "../components/featured-creator"
import TrendingReels from "../components/trending-reels"
import ExploreCreators from "../components/explore-creators"
import { useRouter } from "next/navigation"

export default function CreatorsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full shadow-sm">
              <span className="font-playfair font-bold text-black text-xs">RC</span>
            </div>
            <span className="font-playfair text-base text-white">ReelCode</span>
            <Link href="/reelcode" className="text-white/70 hover:text-yellow-500 transition-colors">
              <Code className="w-5 h-5" />
            </Link>
            <div className="relative flex-1 max-w-[180px]">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
              <Input
                placeholder="Search creators..."
                className="w-full bg-white/5 border-transparent rounded-full pl-7 pr-3 py-1 focus:ring-1 focus:ring-yellow-500/50 h-7 text-xs text-white placeholder:text-gray-500"
                onFocus={() => setIsSearchOpen(true)}
              />
            </div>
            <button className="relative text-white/70 hover:text-yellow-500 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full text-[8px] flex items-center justify-center text-black font-medium">
                3
              </span>
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="text-white/70 hover:text-yellow-500 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="px-3 pt-3">
        <Navigation activeTab="creators" onTabChange={() => {}} />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-3 pb-24 space-y-8">
        <FeaturedCreator />
        <TrendingReels />
        <ExploreCreators />
      </div>

      <BottomNav />

      {/* Search Sidebar */}
      <SearchSidebar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </main>
  )
}


"use client"

import { Users, Code2, Film, Inbox, Home } from "lucide-react"
import Link from "next/link"

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <nav className="bg-zinc-900/80 backdrop-blur-md px-6 py-2">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <NavItem href="/" icon={Home} label="Home" />
          <NavItem href="/community" icon={Users} label="Community" />
          <NavItem href="/reelcode" icon={Code2} label="ReelCode" isMain />
          <NavItem href="/create-reel" icon={Film} label="CreateReel" />
          <NavItem href="/inbox" icon={Inbox} label="Inbox" />
        </div>
      </nav>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  isMain?: boolean
}

function NavItem({ href, icon: Icon, label, isMain }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 ${isMain ? "" : "text-white/70 hover:text-yellow-500"} transition-colors px-2`}
    >
      {isMain ? (
        <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center -mt-8 shadow-lg">
          <Code2 className="w-6 h-6 text-black" />
        </div>
      ) : (
        <Icon className="w-6 h-6" />
      )}
      <span className="text-xs">{label}</span>
    </Link>
  )
}


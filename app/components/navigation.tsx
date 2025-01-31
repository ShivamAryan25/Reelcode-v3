import Link from "next/link"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isLoading: boolean
}

export default function Navigation({ activeTab, onTabChange, isLoading }: NavigationProps) {
  const tabs = [
    { id: "all", label: "All" },
    { id: "creators", label: "Creators" },
  ]

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm p-1 rounded-full">
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <Link
            href={tab.id === "creators" ? "/creators" : "#"}
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex-1 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200
              ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-black shadow-sm"
                  : "text-white hover:bg-white/5"
              }
              ${isLoading ? "pointer-events-none" : ""}
            `}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  )
}


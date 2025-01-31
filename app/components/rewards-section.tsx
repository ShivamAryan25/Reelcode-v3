import { Trophy, TrendingUp } from 'lucide-react'

export default function RewardsSection() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Complete Tasks</h2>
        <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-full">
          <span className="text-yellow-500 font-medium text-xs">50</span>
          <span className="text-yellow-500/70 text-xs">coins</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-900 rounded-xl p-3 border border-white/5">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
            <Trophy className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="font-medium mb-1 text-sm text-white">Join Event</h3>
          <p className="text-xs text-white/50 mb-2">Get exclusive access to premium content</p>
          <button className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
            15 coins
          </button>
        </div>

        <div className="bg-zinc-900 rounded-xl p-3 border border-white/5">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-medium mb-1 text-sm text-white">Complete Profile</h3>
          <p className="text-xs text-white/50 mb-2">Stand out to other creators</p>
          <button className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
            20 coins
          </button>
        </div>
      </div>
    </div>
  )
}


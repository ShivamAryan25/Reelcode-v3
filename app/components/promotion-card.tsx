import { Zap } from 'lucide-react'

export default function PromotionCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black to-zinc-900 border border-white/5">
      <div className="relative z-10 p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-yellow-500">
            Unlock Premium Access
          </h2>
          <p className="text-white/70">
            Get unlimited access to top creators and exclusive content
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 rounded-full text-black font-medium mt-2 hover:bg-yellow-400 transition-colors">
            <Zap className="w-4 h-4" />
            Upgrade Now
          </button>
        </div>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center">
          <Zap className="w-12 h-12 text-yellow-500" />
        </div>
      </div>
    </div>
  )
}


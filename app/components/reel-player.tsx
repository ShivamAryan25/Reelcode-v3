import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface ReelPlayerProps {
  content: string
}

export default function ReelPlayer({ content }: ReelPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#1a1a1a'
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        ctx.font = '20px monospace'
        ctx.fillStyle = '#00ff00'
        ctx.fillText(content, 20, 40)
      }
    }
  }, [content])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex items-center justify-center"
    >
      <canvas ref={canvasRef} width={300} height={500} className="border border-white/10 rounded-lg" />
    </motion.div>
  )
}


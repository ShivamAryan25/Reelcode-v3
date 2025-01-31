'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface SearchSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchSidebar({ isOpen, onClose }: SearchSidebarProps) {
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null)

  const creators = [
    { id: '1', name: 'CodeMaster', reel: 'https://example.com/reel1' },
    { id: '2', name: 'DesignGuru', reel: 'https://example.com/reel2' },
    { id: '3', name: 'DataWizard', reel: 'https://example.com/reel3' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 right-0 w-full sm:w-96 bg-zinc-900 shadow-lg z-50 overflow-y-auto"
        >
          <div className="p-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            <ul className="space-y-2">
              {creators.map((creator) => (
                <li key={creator.id}>
                  <button
                    onClick={() => setSelectedCreator(creator.id)}
                    className="w-full text-left p-2 rounded hover:bg-white/5"
                  >
                    {creator.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {selectedCreator && (
            <div className="p-4 border-t border-white/10">
              <h3 className="text-lg font-semibold mb-2">
                {creators.find((c) => c.id === selectedCreator)?.name}'s Reel
              </h3>
              <div className="aspect-video bg-black rounded">
                <iframe
                  src={creators.find((c) => c.id === selectedCreator)?.reel}
                  className="w-full h-full rounded"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}


"use client"

import { useState } from "react"
import { X, Upload } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreateProjectFormProps {
  onClose: () => void
}

export default function CreateProjectForm({ onClose }: CreateProjectFormProps) {
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [techStack, setTechStack] = useState<string[]>([])
  const [projectStatus, setProjectStatus] = useState("")
  const [files, setFiles] = useState<File[]>([])

  const handleAddTechStack = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      setTechStack([...techStack, e.currentTarget.value])
      e.currentTarget.value = ""
    }
  }

  const handleRemoveTechStack = (techToRemove: string) => {
    setTechStack(techStack.filter((tech) => tech !== techToRemove))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ projectName, projectDescription, techStack, projectStatus, files })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-zinc-900 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
          <Textarea
            placeholder="Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white h-32"
          />
          <div>
            <Input
              placeholder="Add tech stack (press Enter)"
              onKeyDown={handleAddTechStack}
              className="bg-zinc-800 border-zinc-700 text-white mb-2"
            />
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span key={index} className="bg-zinc-700 text-white px-2 py-1 rounded-full text-sm">
                  {tech}
                  <button onClick={() => handleRemoveTechStack(tech)} className="ml-2 text-gray-400 hover:text-white">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          <Select onValueChange={setProjectStatus}>
            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Project Status" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
            </SelectContent>
          </Select>
          <div>
            <Button
              type="button"
              onClick={() => document.getElementById("file-upload")?.click()}
              className="w-full bg-zinc-800 hover:bg-zinc-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Project Files
            </Button>
            <input id="file-upload" type="file" multiple onChange={handleFileUpload} className="hidden" />
          </div>
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{file.name}</span>
                </div>
              ))}
            </div>
          )}
          <Button type="submit" className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
            Create Project
          </Button>
        </form>
      </motion.div>
    </motion.div>
  )
}


import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: 1,
    title: "Task Management App",
    description: "A React-based task management application with drag-and-drop functionality.",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/johndoe/task-management-app",
    liveUrl: "https://task-app.johndoe.com",
  },
  {
    id: 2,
    title: "Weather Forecast API",
    description: "RESTful API for retrieving weather forecasts using Node.js and Express.",
    techStack: ["Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/johndoe/weather-forecast-api",
    liveUrl: "https://api.weather.johndoe.com",
  },
]

export default function Projects() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">My Projects</h3>
      {projects.map((project) => (
        <div key={project.id} className="bg-zinc-900 rounded-xl p-4 space-y-3">
          <h4 className="font-medium text-lg">{project.title}</h4>
          <p className="text-sm text-white/70">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="bg-zinc-800 px-2 py-1 rounded-full text-xs">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="bg-zinc-800 text-yellow-500 hover:bg-zinc-700 hover:text-yellow-400 border-zinc-700"
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="bg-zinc-800 text-yellow-500 hover:bg-zinc-700 hover:text-yellow-400 border-zinc-700"
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}


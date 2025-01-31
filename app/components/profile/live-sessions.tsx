import { Calendar, Clock, Users } from "lucide-react"

const liveSessions = [
  { id: 1, title: "React Hooks Deep Dive", date: "2023-05-15", duration: "1h 30m", attendees: 120 },
  { id: 2, title: "Building Scalable APIs", date: "2023-05-22", duration: "2h", attendees: 95 },
  { id: 3, title: "Advanced CSS Techniques", date: "2023-05-29", duration: "1h 45m", attendees: 150 },
]

export default function LiveSessions() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Past Live Sessions</h3>
      {liveSessions.map((session) => (
        <div key={session.id} className="bg-zinc-900 rounded-xl p-4 space-y-2">
          <h4 className="font-medium">{session.title}</h4>
          <div className="flex items-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{session.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{session.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{session.attendees} attendees</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


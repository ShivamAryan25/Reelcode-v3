import { GitCommit, GitPullRequest, Star } from "lucide-react"

const contributions = [
  {
    id: 1,
    project: "react",
    description: "Fixed a bug in the useEffect hook",
    type: "pull-request",
    url: "https://github.com/facebook/react/pull/12345",
  },
  {
    id: 2,
    project: "next.js",
    description: "Added documentation for new API routes feature",
    type: "commit",
    url: "https://github.com/vercel/next.js/commit/abcdef123456",
  },
  {
    id: 3,
    project: "tailwindcss",
    description: "Created a new utility class for flexbox layouts",
    type: "pull-request",
    url: "https://github.com/tailwindlabs/tailwindcss/pull/67890",
  },
]

export default function Contributions() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Open Source Contributions</h3>
      {contributions.map((contribution) => (
        <div key={contribution.id} className="bg-zinc-900 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <h4 className="font-medium">{contribution.project}</h4>
          </div>
          <p className="text-sm text-white/70">{contribution.description}</p>
          <a
            href={contribution.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-yellow-500 hover:underline"
          >
            {contribution.type === "pull-request" ? (
              <GitPullRequest className="w-4 h-4" />
            ) : (
              <GitCommit className="w-4 h-4" />
            )}
            <span className="text-sm">View {contribution.type === "pull-request" ? "Pull Request" : "Commit"}</span>
          </a>
        </div>
      ))}
    </div>
  )
}


import { Cog } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="animate-spin">
        <Cog className="h-8 w-8 text-blue-500" />
      </div>
    </div>
  )
}

import { Leaf } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Leaf className="h-6 w-6 text-primary" />
      <span className="font-bold text-xl">Legendary Contractors</span>
    </div>
  )
}


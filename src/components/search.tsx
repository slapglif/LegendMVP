import { Input } from "@/components/ui/input"
import { Search as SearchIcon } from "lucide-react"

export function Search() {
  return (
    <div className="flex items-center space-x-2 w-full max-w-sm">
      <SearchIcon className="h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search leads..."
        className="h-9 md:w-[300px] lg:w-[400px]"
      />
    </div>
  )
}


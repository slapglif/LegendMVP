import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { Plus, Settings, Users, Home, Building2 } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { AddLeadDialog } from "./add-lead-dialog"
import { Link, useLocation } from "react-router-dom"

export function DashboardNav() {
  const location = useLocation()
  const handleAddLeads = (leads: any[]) => {
    // Here you would typically make an API call to add the leads
    console.log("Adding leads:", leads)
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Logo />
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Button
            variant={location.pathname === "/" ? "secondary" : "ghost"}
            asChild
          >
            <Link to="/" className="text-sm font-medium transition-colors">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button
            variant={location.pathname === "/properties" ? "secondary" : "ghost"}
            asChild
          >
            <Link
              to="/properties"
              className="text-sm font-medium transition-colors"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Properties
            </Link>
          </Button>
          <Button
            variant={location.pathname === "/crews" ? "secondary" : "ghost"}
            asChild
          >
            <Link to="/crews" className="text-sm font-medium transition-colors">
              <Users className="h-4 w-4 mr-2" />
              Crews
            </Link>
          </Button>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <AddLeadDialog onAddLeads={handleAddLeads} />
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}


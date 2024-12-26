import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"

const recentLeads = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia@example.com",
    phone: "(337) 555-0123",
    service: "Kitchen Remodel, 250 sq ft",
    status: "new",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson@example.com",
    phone: "(337) 555-0124",
    service: "Bathroom Renovation, 100 sq ft",
    status: "scheduled",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella@example.com",
    phone: "(337) 555-0125",
    service: "Home Addition, 400 sq ft",
    status: "completed",
  },
  {
    id: "4",
    name: "William Kim",
    email: "william@example.com",
    phone: "(337) 555-0126",
    service: "Basement Finishing, 800 sq ft",
    status: "contacted",
  },
  {
    id: "5",
    name: "Sofia Davis",
    email: "sofia@example.com",
    phone: "(337) 555-0127",
    service: "Deck Construction, 300 sq ft",
    status: "follow-up",
  },
]

const statusColors = {
  new: "bg-blue-500",
  scheduled: "bg-purple-500",
  completed: "bg-green-500",
  contacted: "bg-yellow-500",
  "follow-up": "bg-red-500",
}

const ITEMS_PER_PAGE = 3

export function RecentLeads() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(recentLeads.length / ITEMS_PER_PAGE)
  const currentLeads = recentLeads.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  )

  return (
    <div className="h-[450px] flex flex-col">
      <div className="flex-1 overflow-y-auto pr-2">
        <AnimatePresence mode="wait">
          {currentLeads.map((lead, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              key={lead.email}
              onClick={() => {
                navigate(`/leads/${lead.id}`)
              }}
              className="group relative flex items-center rounded-lg border p-3 mb-3 hover:bg-muted/50 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10 transition-transform group-hover:scale-105">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium leading-none">{lead.name}</h3>
                    <Badge
                      variant="secondary"
                      className="capitalize transition-colors hover:bg-secondary"
                    >
                      <span
                        className={`mr-1.5 h-2 w-2 rounded-full ${
                          statusColors[lead.status as keyof typeof statusColors]
                        }`}
                      />
                      {lead.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3.5 w-3.5" />
                      <span>{lead.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{lead.phone}</span>
                    </div>
                    <p>{lead.service}</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between py-4 border-t mt-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className="hover:bg-muted/50 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage + 1} of {totalPages}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
          }
          disabled={currentPage === totalPages - 1}
          className="hover:bg-muted/50 transition-colors"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}


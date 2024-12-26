import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Lead } from "./data-table"

interface LeadDetailsModalProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadDetailsModal({ lead, open, onOpenChange }: LeadDetailsModalProps) {
  if (!lead) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
          <DialogDescription>
            Complete information about this lead
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Name:</span>
            <span className="col-span-3">{lead.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Email:</span>
            <span className="col-span-3">{lead.email}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Phone:</span>
            <span className="col-span-3">{lead.phone}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Service:</span>
            <span className="col-span-3">{lead.serviceType}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Status:</span>
            <span className="col-span-3">
              <Badge
                variant={
                  lead.status === 'new' ? 'default' :
                  lead.status === 'contacted' ? 'secondary' :
                  lead.status === 'scheduled' ? 'warning' :
                  lead.status === 'completed' ? 'success' :
                  'destructive'
                }
              >
                {lead.status}
              </Badge>
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Date:</span>
            <span className="col-span-3">{lead.date}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Property:</span>
            <span className="col-span-3">{lead.propertySize}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


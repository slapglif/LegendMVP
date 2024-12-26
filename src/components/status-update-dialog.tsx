import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StatusUpdateDialogProps {
  currentStatus: string
  onStatusUpdate: (data: {
    status: string
    notes: string
    followUpDate?: Date
  }) => void
}

export function StatusUpdateDialog({
  currentStatus,
  onStatusUpdate,
}: StatusUpdateDialogProps) {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState(currentStatus)
  const [notes, setNotes] = useState("")
  const [followUpDate, setFollowUpDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = () => {
    onStatusUpdate({ status, notes, followUpDate })
    toast({
      title: "Status Updated",
      description: "The lead status has been successfully updated.",
    })
    setOpen(false)
    setStep(1)
  }

  const statusOptions = [
    { value: "new", label: "New Lead" },
    { value: "contacted", label: "Contacted" },
    { value: "scheduled", label: "Service Scheduled" },
    { value: "completed", label: "Service Completed" },
    { value: "follow-up", label: "Needs Follow-up" },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update Status</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Lead Status</DialogTitle>
          <DialogDescription>
            Update the status and add any relevant notes.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>New Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full"
                  onClick={() => setStep(2)}
                  disabled={!status}
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    placeholder="Add any relevant notes about this status change..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)}>Continue</Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Follow-up Date (Optional)</Label>
                  <Calendar
                    mode="single"
                    selected={followUpDate}
                    onSelect={setFollowUpDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit}>Update Status</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
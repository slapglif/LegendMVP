import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Papa from "papaparse"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, Plus, Check } from "lucide-react"

interface Lead {
  name: string
  email: string
  phone: string
  address: string
  serviceType: string
  propertySize: string
  notes?: string
}

interface AddLeadDialogProps {
  onAddLeads: (leads: Lead[]) => void
}

export function AddLeadDialog({ onAddLeads }: AddLeadDialogProps) {
  const [mode, setMode] = useState<"simple" | "advanced">("simple")
  const [step, setStep] = useState(1)
  const [open, setOpen] = useState(false)
  const [lead, setLead] = useState<Lead>({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "",
    propertySize: "",
    notes: "",
  })
  const [importedLeads, setImportedLeads] = useState<Lead[]>([])
  const [csvContent, setCsvContent] = useState("")
  const { toast } = useToast()

  const handleInputChange = (field: keyof Lead, value: string) => {
    setLead((prev) => ({ ...prev, [field]: value }))
  }

  const handleSimpleSubmit = () => {
    onAddLeads([lead])
    toast({
      title: "Lead Added",
      description: "The new lead has been successfully added.",
    })
    setOpen(false)
    setStep(1)
    setLead({
      name: "",
      email: "",
      phone: "",
      address: "",
      serviceType: "",
      propertySize: "",
      notes: "",
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        setCsvContent(text)
        const results = Papa.parse<Lead>(text, {
          header: true,
          skipEmptyLines: true,
        })
        setImportedLeads(results.data)
      }
      reader.readAsText(file)
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = event.clipboardData.getData("text")
    setCsvContent(text)
    const results = Papa.parse<Lead>(text, {
      header: true,
      skipEmptyLines: true,
    })
    setImportedLeads(results.data)
  }

  const handleAdvancedSubmit = () => {
    onAddLeads(importedLeads)
    toast({
      title: "Leads Added",
      description: `${importedLeads.length} leads have been successfully added.`,
    })
    setOpen(false)
    setImportedLeads([])
    setCsvContent("")
  }

  const serviceTypes = [
    "Lawn Mowing",
    "Edging",
    "Fertilization",
    "Weed Control",
    "Leaf Removal",
    "Full Service",
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogDescription>
            Add a new lead to your customer database.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={mode} onValueChange={(v) => setMode(v as "simple" | "advanced")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simple">Simple Mode</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Mode</TabsTrigger>
          </TabsList>
          <TabsContent value="simple">
            <div className="mt-4">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={lead.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={lead.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          value={lead.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="(555) 555-5555"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Service Type</Label>
                        <Select
                          value={lead.serviceType}
                          onValueChange={(value) =>
                            handleInputChange("serviceType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => setStep(2)}
                      disabled={!lead.name || !lead.email || !lead.phone}
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
                      <Label>Address</Label>
                      <Input
                        value={lead.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="123 Main St, Anytown, USA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Property Size</Label>
                      <Input
                        value={lead.propertySize}
                        onChange={(e) =>
                          handleInputChange("propertySize", e.target.value)
                        }
                        placeholder="0.5 acres"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Notes</Label>
                      <Textarea
                        value={lead.notes}
                        onChange={(e) =>
                          handleInputChange("notes", e.target.value)
                        }
                        placeholder="Add any additional notes..."
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button
                        onClick={handleSimpleSubmit}
                        disabled={!lead.address || !lead.propertySize}
                      >
                        Add Lead
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>
          <TabsContent value="advanced">
            <div className="mt-4 space-y-4">
              <div className="flex justify-center">
                <div className="space-y-4 text-center">
                  <div>
                    <Input
                      type="file"
                      accept=".csv,.tsv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload CSV/TSV
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">or</p>
                  <div className="space-y-2">
                    <Label>Paste CSV/TSV Data</Label>
                    <Textarea
                      placeholder="Paste your CSV/TSV data here..."
                      className="min-h-[100px]"
                      value={csvContent}
                      onChange={(e) => {
                        setCsvContent(e.target.value)
                        const results = Papa.parse<Lead>(e.target.value, {
                          header: true,
                          skipEmptyLines: true,
                        })
                        setImportedLeads(results.data)
                      }}
                      onPaste={handlePaste}
                    />
                  </div>
                </div>
              </div>

              {importedLeads.length > 0 && (
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Service Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {importedLeads.slice(0, 5).map((lead, index) => (
                          <TableRow key={index}>
                            <TableCell>{lead.name}</TableCell>
                            <TableCell>{lead.email}</TableCell>
                            <TableCell>{lead.phone}</TableCell>
                            <TableCell>{lead.serviceType}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {importedLeads.length > 5 && (
                    <p className="text-sm text-muted-foreground text-center">
                      And {importedLeads.length - 5} more leads...
                    </p>
                  )}
                  <Button
                    className="w-full"
                    onClick={handleAdvancedSubmit}
                    disabled={importedLeads.length === 0}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Import {importedLeads.length} Leads
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  User,
  Clock,
  Ruler,
  DollarSign,
  MessageSquare,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Edit2,
  Save,
  Upload,
  Trash2,
  Plus,
} from "lucide-react"
import { StatusUpdateDialog } from "@/components/status-update-dialog"
import { ScheduleServiceDialog } from "@/components/schedule-service-dialog"

interface LeadDetails {
  id: string
  name: string
  email: string
  phone: string
  address: string
  serviceType: string
  status: string
  date: string
  time: string
  propertySize: string
  estimatedCost: string
  notes: string
  propertyDetails: {
    lawnType: string
    obstacles: string
    slope: string
    fencing: string
    pets: string
    specialInstructions: string
  }
  documents: Array<{
    name: string
    type: string
    date: string
    size: string
  }>
  history: Array<{
    date: string
    action: string
    notes: string
  }>
  engagementMetrics: {
    totalServices: number
    lastService: string
    nextService: string
    averageRating: number
    totalSpent: string
    preferredDay: string
    preferredTime: string
  }
}

interface EditableFields {
  contact: {
    email: string
    phone: string
    address: string
  }
  service: {
    date: string
    time: string
    propertySize: string
    estimatedCost: string
  }
  notes: string
  propertyDetails: LeadDetails['propertyDetails']
  status: string
}

// This would typically come from an API
const getLeadDetails = (id: string): LeadDetails => {
  return {
    id,
    name: "John Smith",
    email: "john@example.com",
    phone: "(337) 555-0123",
    address: "123 Main St, Anytown, USA",
    serviceType: "Lawn Mowing",
    status: "scheduled",
    date: "2024-01-15",
    time: "10:00 AM",
    propertySize: "0.5 acres",
    estimatedCost: "$150",
    notes: "Customer prefers morning appointments. Has a dog that needs to be kept inside during service.",
    propertyDetails: {
      lawnType: "Bermuda",
      obstacles: "Sprinkler system, garden beds",
      slope: "Slight",
      fencing: "Full perimeter",
      pets: "1 dog",
      specialInstructions: "Gate code: 1234",
    },
    documents: [
      {
        name: "Property Photos",
        type: "image",
        date: "2024-01-10",
        size: "2.3 MB",
      },
      {
        name: "Service Agreement",
        type: "pdf",
        date: "2024-01-12",
        size: "156 KB",
      },
    ],
    history: [
      {
        date: "2024-01-10",
        action: "Initial Contact",
        notes: "Customer inquired about lawn mowing services",
      },
      {
        date: "2024-01-12",
        action: "Quote Sent",
        notes: "Provided estimate for bi-weekly mowing",
      },
      {
        date: "2024-01-13",
        action: "Quote Accepted",
        notes: "Customer agreed to the proposed rate",
      },
    ],
    engagementMetrics: {
      totalServices: 5,
      lastService: "2024-01-01",
      nextService: "2024-01-15",
      averageRating: 4.8,
      totalSpent: "$750",
      preferredDay: "Monday",
      preferredTime: "Morning",
    },
  }
}

const statusColors = {
  new: "bg-blue-500",
  scheduled: "bg-purple-500",
  completed: "bg-green-500",
  contacted: "bg-yellow-500",
  "follow-up": "bg-red-500",
}

export default function LeadDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")
  const [editMode, setEditMode] = useState<Record<string, boolean>>({})
  const [editedValues, setEditedValues] = useState<Partial<EditableFields>>({})
  const leadDetails = getLeadDetails(id || "1")

  const handleEdit = (section: keyof EditableFields) => {
    setEditMode((prev) => ({ ...prev, [section]: true }))
    if (section === 'contact') {
      setEditedValues((prev) => ({
        ...prev,
        contact: {
          email: leadDetails.email,
          phone: leadDetails.phone,
          address: leadDetails.address,
        },
      }))
    } else if (section === 'service') {
      setEditedValues((prev) => ({
        ...prev,
        service: {
          date: leadDetails.date,
          time: leadDetails.time,
          propertySize: leadDetails.propertySize,
          estimatedCost: leadDetails.estimatedCost,
        },
      }))
    } else if (section === 'notes') {
      setEditedValues((prev) => ({
        ...prev,
        notes: leadDetails.notes,
      }))
    } else if (section === 'propertyDetails') {
      setEditedValues((prev) => ({
        ...prev,
        propertyDetails: leadDetails.propertyDetails,
      }))
    } else if (section === 'status') {
      setEditedValues((prev) => ({
        ...prev,
        status: leadDetails.status,
      }))
    }
  }

  const handleSave = (section: keyof EditableFields) => {
    // Here you would typically make an API call to save the changes
    setEditMode((prev) => ({ ...prev, [section]: false }))
  }

  const handleInputChange = (
    section: keyof EditableFields,
    field: string,
    value: string
  ) => {
    setEditedValues((prev) => {
      const newValues = { ...prev }
      if (!newValues[section]) {
        newValues[section] = { [field]: value } as any
      } else {
        newValues[section] = {
          ...(newValues[section] as any),
          [field]: value,
        }
      }
      return newValues
    })
  }

  const handleStatusUpdate = (data: {
    status: string
    notes: string
    followUpDate?: Date
  }) => {
    // Here you would typically make an API call to update the status
    console.log("Status updated:", data)
  }

  const handleScheduleService = (data: {
    date: Date
    time: string
    serviceType: string
    notes: string
    estimatedDuration: string
    crew?: string
  }) => {
    // Here you would typically make an API call to schedule the service
    console.log("Service scheduled:", data)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="font-semibold">Lead Details</h1>
        </div>
      </div>
      <div className="container mx-auto py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {leadDetails.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{leadDetails.name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant="secondary"
                  className="capitalize transition-colors hover:bg-secondary"
                >
                  <span
                    className={`mr-1.5 h-2 w-2 rounded-full ${
                      statusColors[leadDetails.status as keyof typeof statusColors]
                    }`}
                  />
                  {leadDetails.status}
                </Badge>
                <span className="text-muted-foreground">#{leadDetails.id}</span>
              </div>
            </div>
          </div>
          <div className="space-x-2">
            <StatusUpdateDialog
              currentStatus={leadDetails.status}
              onStatusUpdate={handleStatusUpdate}
            />
            <ScheduleServiceDialog onSchedule={handleScheduleService} />
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="property">Property Details</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit("contact")}
                    >
                      {editMode.contact ? (
                        <Save className="h-4 w-4" onClick={() => handleSave("contact")} />
                      ) : (
                        <Edit2 className="h-4 w-4" />
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {editMode.contact ? (
                      <>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            value={editedValues.contact?.email || leadDetails.email}
                            onChange={(e) =>
                              handleInputChange("contact", "email", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input
                            value={editedValues.contact?.phone || leadDetails.phone}
                            onChange={(e) =>
                              handleInputChange("contact", "phone", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Address</Label>
                          <Input
                            value={editedValues.contact?.address || leadDetails.address}
                            onChange={(e) =>
                              handleInputChange("contact", "address", e.target.value)
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{leadDetails.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{leadDetails.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{leadDetails.address}</span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg">Service Details</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit("service")}
                    >
                      {editMode.service ? (
                        <Save className="h-4 w-4" onClick={() => handleSave("service")} />
                      ) : (
                        <Edit2 className="h-4 w-4" />
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {editMode.service ? (
                      <>
                        <div className="space-y-2">
                          <Label>Next Service Date</Label>
                          <Input
                            type="date"
                            value={editedValues.service?.date || leadDetails.date}
                            onChange={(e) =>
                              handleInputChange("service", "date", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Time</Label>
                          <Input
                            type="time"
                            value={editedValues.service?.time || leadDetails.time}
                            onChange={(e) =>
                              handleInputChange("service", "time", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Property Size</Label>
                          <Input
                            value={
                              editedValues.service?.propertySize ||
                              leadDetails.propertySize
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "service",
                                "propertySize",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Estimated Cost</Label>
                          <Input
                            value={
                              editedValues.service?.estimatedCost ||
                              leadDetails.estimatedCost
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "service",
                                "estimatedCost",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{leadDetails.date}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{leadDetails.time}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Ruler className="h-4 w-4 text-muted-foreground" />
                          <span>{leadDetails.propertySize}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{leadDetails.estimatedCost}</span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg">Notes</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit("notes")}
                    >
                      {editMode.notes ? (
                        <Save className="h-4 w-4" onClick={() => handleSave("notes")} />
                      ) : (
                        <Edit2 className="h-4 w-4" />
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {editMode.notes ? (
                      <Textarea
                        value={editedValues.notes || leadDetails.notes}
                        onChange={(e) =>
                          setEditedValues((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                        className="min-h-[100px]"
                      />
                    ) : (
                      <p className="text-muted-foreground">{leadDetails.notes}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Total Services</p>
                    <p className="text-2xl font-bold">
                      {leadDetails.engagementMetrics.totalServices}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Average Rating</p>
                    <p className="text-2xl font-bold">
                      {leadDetails.engagementMetrics.averageRating}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Total Spent</p>
                    <p className="text-2xl font-bold">
                      {leadDetails.engagementMetrics.totalSpent}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Next Service</p>
                    <p className="text-2xl font-bold">
                      {leadDetails.engagementMetrics.nextService}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="property">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Property Details</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit("propertyDetails")}
                >
                  {editMode.propertyDetails ? (
                    <Save
                      className="h-4 w-4"
                      onClick={() => handleSave("propertyDetails")}
                    />
                  ) : (
                    <Edit2 className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                {editMode.propertyDetails ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Lawn Type</Label>
                      <Input
                        value={
                          editedValues.propertyDetails?.lawnType ||
                          leadDetails.propertyDetails.lawnType
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "propertyDetails",
                            "lawnType",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Obstacles</Label>
                      <Input
                        value={
                          editedValues.propertyDetails?.obstacles ||
                          leadDetails.propertyDetails.obstacles
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "propertyDetails",
                            "obstacles",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Slope</Label>
                      <Input
                        value={
                          editedValues.propertyDetails?.slope ||
                          leadDetails.propertyDetails.slope
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "propertyDetails",
                            "slope",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Fencing</Label>
                      <Input
                        value={
                          editedValues.propertyDetails?.fencing ||
                          leadDetails.propertyDetails.fencing
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "propertyDetails",
                            "fencing",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Pets</Label>
                      <Input
                        value={
                          editedValues.propertyDetails?.pets ||
                          leadDetails.propertyDetails.pets
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "propertyDetails",
                            "pets",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Special Instructions</Label>
                      <Input
                        value={
                          editedValues.propertyDetails?.specialInstructions ||
                          leadDetails.propertyDetails.specialInstructions
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "propertyDetails",
                            "specialInstructions",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Lawn Type</p>
                      <p className="text-muted-foreground">
                        {leadDetails.propertyDetails.lawnType}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Obstacles</p>
                      <p className="text-muted-foreground">
                        {leadDetails.propertyDetails.obstacles}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Slope</p>
                      <p className="text-muted-foreground">
                        {leadDetails.propertyDetails.slope}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Fencing</p>
                      <p className="text-muted-foreground">
                        {leadDetails.propertyDetails.fencing}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Pets</p>
                      <p className="text-muted-foreground">
                        {leadDetails.propertyDetails.pets}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Special Instructions</p>
                      <p className="text-muted-foreground">
                        {leadDetails.propertyDetails.specialInstructions}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {leadDetails.history.map((event, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={event.date}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{event.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.notes}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {event.date}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Documents</CardTitle>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leadDetails.documents.map((doc) => (
                      <TableRow key={doc.name}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.date}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
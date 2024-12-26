import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Users,
  Plus,
  MoreVertical,
  Star,
  Phone,
  Mail,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Award,
  Search,
  Filter,
  Trash2,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ITEMS_PER_PAGE = 6

interface CrewMember {
  id: string
  name: string
  role: string
  phone: string
  email: string
  status: string
  skills: string[]
  certifications: string[]
  avatar: string
}

interface Crew {
  id: string
  name: string
  leader: CrewMember
  members: CrewMember[]
  currentJob: string
  nextJob: string
  rating: number
  specialties: string[]
  completedJobs: number
  activeJobs: number
}

export default function CrewManagement() {
  const [crews, setCrews] = useState<Crew[]>(mockCrews)
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedCrew, setSelectedCrew] = useState<Crew | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleSaveCrew = (updatedCrew: Crew) => {
    setCrews(crews.map(crew => 
      crew.id === updatedCrew.id ? updatedCrew : crew
    ))
    setEditMode(false)
    toast({
      title: "Crew Updated",
      description: "The crew information has been successfully updated.",
    })
  }

  const filteredCrews = crews.filter(crew =>
    crew.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crew.leader.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginatedCrews = filteredCrews.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  )

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Crew Management</h1>
          <p className="text-muted-foreground">
            Manage your construction teams and assignments
          </p>
        </div>
        <Button onClick={() => {
          setSelectedCrew(null)
          setEditMode(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Crew
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search crews..."
            className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {paginatedCrews.map((crew, index) => (
            <motion.div
              key={crew.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative group">
                <CardHeader>
                  <div className="flex justify-between items-start">
                  <div className="space-y-1">
                      <CardTitle>{crew.name}</CardTitle>
                      <CardDescription>
                        {crew.specialties.join(" • ")}
                      </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedCrew(crew)
                          setEditMode(true)
                        }}>
                        Edit Crew
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete Crew
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={crew.leader.avatar} />
                      <AvatarFallback>{crew.leader.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{crew.leader.name}</p>
                      <p className="text-sm text-muted-foreground">{crew.leader.role}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Team Size</span>
                      <span className="font-medium">{crew.members.length + 1}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="font-medium flex items-center">
                        {crew.rating}
                        <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                      </span>
                      </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completed Jobs</span>
                      <span className="font-medium">{crew.completedJobs}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{crew.currentJob}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{crew.nextJob}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedCrews.length} of {filteredCrews.length} crews
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={(currentPage + 1) * ITEMS_PER_PAGE >= filteredCrews.length}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Edit/Add Crew Dialog */}
      <Dialog open={editMode} onOpenChange={(open) => !open && setEditMode(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCrew ? 'Edit Crew' : 'Add New Crew'}</DialogTitle>
            <DialogDescription>
              {selectedCrew ? 'Modify crew information and members' : 'Create a new crew'}
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="details" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Crew Details</TabsTrigger>
              <TabsTrigger value="members">Team Members</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Crew Name</Label>
                  <Input 
                    placeholder="Enter crew name"
                    defaultValue={selectedCrew?.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Specialties</Label>
                  <Select defaultValue={selectedCrew?.specialties[0]}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom-homes">Custom Homes</SelectItem>
                      <SelectItem value="renovations">Major Renovations</SelectItem>
                      <SelectItem value="kitchen">Kitchen Remodels</SelectItem>
                      <SelectItem value="bathroom">Bathroom Remodels</SelectItem>
                      <SelectItem value="additions">Home Additions</SelectItem>
                      <SelectItem value="basement">Basement Finishing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Current Job</Label>
                  <Input 
                    placeholder="Enter current job"
                    defaultValue={selectedCrew?.currentJob}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Next Job</Label>
                  <Input 
                    placeholder="Enter next job"
                    defaultValue={selectedCrew?.nextJob}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <Input 
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="Enter rating"
                    defaultValue={selectedCrew?.rating}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Completed Jobs</Label>
                  <Input 
                    type="number"
                    placeholder="Enter completed jobs"
                    defaultValue={selectedCrew?.completedJobs}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="members" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Crew Leader</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      placeholder="Leader name"
                      defaultValue={selectedCrew?.leader.name}
                    />
                    <Input 
                      placeholder="Leader role"
                      defaultValue={selectedCrew?.leader.role}
                    />
                    <Input 
                      placeholder="Phone number"
                      defaultValue={selectedCrew?.leader.phone}
                    />
                    <Input 
                      placeholder="Email"
                      defaultValue={selectedCrew?.leader.email}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Team Members</Label>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Member
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {selectedCrew?.members.map((member, index) => (
                      <div key={member.id} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                        <Input 
                          placeholder="Member name"
                          defaultValue={member.name}
                        />
                        <Input 
                          placeholder="Member role"
                          defaultValue={member.role}
                        />
                        <Input 
                          placeholder="Phone number"
                          defaultValue={member.phone}
                        />
                        <Input 
                          placeholder="Email"
                          defaultValue={member.email}
                        />
                        <Select defaultValue={member.status}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="on-leave">On Leave</SelectItem>
                            <SelectItem value="unavailable">Unavailable</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Here you would normally save the crew data
              handleSaveCrew(selectedCrew || mockCrews[0]) // Temporary, replace with actual data
            }}>
              {selectedCrew ? 'Save Changes' : 'Create Crew'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Mock data
const mockCrews: Crew[] = [
  {
    id: "1",
    name: "Construction Team A",
    leader: {
      id: "l1",
      name: "Robert Mason",
      role: "Project Manager",
      phone: "(555) 123-4567",
      email: "robert@example.com",
      status: "active",
      skills: ["Project Management", "Structural Work", "Quality Control"],
      certifications: ["PMP", "OSHA Safety"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    members: [
      {
        id: "m1",
        name: "John Carpenter",
        role: "Lead Carpenter",
        phone: "(555) 234-5678",
        email: "john@example.com",
        status: "active",
        skills: ["Finish Carpentry", "Framing", "Cabinet Installation"],
        certifications: ["Master Carpenter"],
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      },
      {
        id: "m2",
        name: "Mike Builder",
        role: "General Contractor",
        phone: "(555) 345-6789",
        email: "mike@example.com",
        status: "active",
        skills: ["General Construction", "Project Planning", "Team Leadership"],
        certifications: ["General Contractor License"],
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      }
    ],
    currentJob: "123 Main St - Custom Home Build",
    nextJob: "456 Oak Ave - Kitchen Remodel",
    rating: 4.8,
    specialties: ["Custom Homes", "Major Renovations"],
    completedJobs: 156,
    activeJobs: 3
  },
  {
    id: "2",
    name: "Remodeling Team B",
    leader: {
      id: "l2",
      name: "Emily Plumber",
      role: "Renovation Supervisor",
      phone: "(555) 456-7890",
      email: "emily@example.com",
      status: "active",
      skills: ["Kitchen Remodels", "Bathroom Remodels", "Project Coordination"],
      certifications: ["Certified Remodeler", "Plumbing License"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    members: [
      {
        id: "m3",
        name: "Tom Tile",
        role: "Tile Specialist",
        phone: "(555) 567-8901",
        email: "tom@example.com",
        status: "on-leave",
        skills: ["Tile Installation", "Stone Work", "Waterproofing"],
        certifications: ["Certified Tile Installer"],
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      }
    ],
    currentJob: "789 Pine St - Master Bath Renovation",
    nextJob: "321 Elm St - Kitchen Upgrade",
    rating: 4.6,
    specialties: ["Kitchen Remodels", "Bathroom Remodels"],
    completedJobs: 98,
    activeJobs: 2
  }
] 
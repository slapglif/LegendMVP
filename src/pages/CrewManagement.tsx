import { useState } from "react"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Edit2, Trash2, Calendar, Users, Star, Phone, Mail, Award, Wrench } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CrewMember {
  id: string
  name: string
  role: string
  phone: string
  email: string
  status: "active" | "on-leave" | "unavailable"
  skills: string[]
  certifications: string[]
  avatar: string
}

interface Crew {
  id: string
  name: string
  leader: CrewMember
  members: CrewMember[]
  currentJob?: string
  nextJob?: string
  rating: number
  specialties: string[]
  completedJobs: number
  activeJobs: number
}

// Sample data
const crews: Crew[] = [
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
      skills: ["Project Management", "Custom Homes", "Remodeling"],
      certifications: ["PMP Certified", "OSHA Safety", "General Contractor License"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    members: [
      {
        id: "m1",
        name: "Mike Builder",
        role: "Lead Carpenter",
        phone: "(555) 234-5678",
        email: "mike@example.com",
        status: "active",
        skills: ["Framing", "Finish Carpentry", "Cabinet Installation"],
        certifications: ["Master Carpenter", "OSHA Safety"],
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      },
      {
        id: "m2",
        name: "Sarah Electric",
        role: "Master Electrician",
        phone: "(555) 345-6789",
        email: "sarah@example.com",
        status: "active",
        skills: ["Electrical Systems", "Smart Home Integration", "Code Compliance"],
        certifications: ["Master Electrician License", "Smart Home Certified"],
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
    ],
    currentJob: "123 Main St - Custom Home Construction",
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
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
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
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      },
    ],
    currentJob: "789 Pine St - Master Bath Renovation",
    nextJob: "321 Elm St - Kitchen Upgrade",
    rating: 4.6,
    specialties: ["Kitchen Remodels", "Bathroom Remodels"],
    completedJobs: 100,
    activeJobs: 2
  },
]

export default function CrewManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCrew, setSelectedCrew] = useState<Crew | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)

  const filteredCrews = crews.filter(
    (crew) =>
      crew.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crew.specialties.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      )
  )

  const statusColors = {
    active: "bg-green-500",
    "on-leave": "bg-yellow-500",
    unavailable: "bg-red-500",
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Crew Management</h1>
          <p className="text-muted-foreground mt-1">Manage your construction teams and assignments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Crew
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add New Crew</DialogTitle>
              <DialogDescription>
                Create a new crew and assign team members.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="details" className="mt-4">
              <TabsList>
                <TabsTrigger value="details">Crew Details</TabsTrigger>
                <TabsTrigger value="leader">Crew Leader</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Crew Name</Label>
                    <Input placeholder="Enter crew name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Specialties</Label>
                    <Input placeholder="Enter specialties" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="leader" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Leader Name</Label>
                    <Input placeholder="Enter leader name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input placeholder="Enter role" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input placeholder="Enter phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="members" className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Users className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Add crew members after creating the crew
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end mt-6">
              <Button>Create Crew</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {filteredCrews.map((crew) => (
          <Card key={crew.id} className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>{crew.name}</span>
                </div>
                <Badge variant="secondary" className="flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {crew.rating}
                </Badge>
              </CardTitle>
              <CardDescription>
                {crew.specialties.join(" • ")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={crew.leader.avatar} />
                    <AvatarFallback>
                      {crew.leader.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{crew.leader.name}</p>
                    <p className="text-xs text-muted-foreground">{crew.leader.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Team Size</p>
                    <p className="font-medium">{crew.members.length + 1} Members</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Active Jobs</p>
                    <p className="font-medium">{crew.activeJobs} Projects</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Completed</p>
                    <p className="font-medium">{crew.completedJobs} Projects</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">Status</p>
                    <Badge className={statusColors[crew.leader.status]}>
                      {crew.leader.status}
                    </Badge>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Current Assignment</h4>
                  <p className="text-sm text-muted-foreground">{crew.currentJob || "No active assignment"}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCrew(crew)
                  setIsDetailsDialogOpen(true)
                }}
              >
                <Users className="h-4 w-4 mr-2" />
                View Team
              </Button>
              <div className="space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCrew(crew)
                    setIsDetailsDialogOpen(true)
                  }}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Crew Details</DialogTitle>
            <DialogDescription>
              View and manage crew information and members
            </DialogDescription>
          </DialogHeader>
          {selectedCrew && (
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Crew Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Crew Name</Label>
                        <Input defaultValue={selectedCrew.name} />
                      </div>
                      <div className="space-y-2">
                        <Label>Specialties</Label>
                        <Input defaultValue={selectedCrew.specialties.join(", ")} />
                      </div>
                      <div className="space-y-2">
                        <Label>Rating</Label>
                        <Input defaultValue={selectedCrew.rating.toString()} />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Assignments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Current Job</Label>
                        <Input defaultValue={selectedCrew.currentJob || "None"} />
                      </div>
                      <div className="space-y-2">
                        <Label>Next Job</Label>
                        <Input defaultValue={selectedCrew.nextJob || "None"} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="members">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Team Members</CardTitle>
                    <Button size="sm" onClick={() => setIsAddMemberDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Member
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Leader Card */}
                      <div className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={selectedCrew.leader.avatar} />
                              <AvatarFallback>
                                {selectedCrew.leader.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{selectedCrew.leader.name}</h4>
                              <p className="text-sm text-muted-foreground">{selectedCrew.leader.role}</p>
                            </div>
                          </div>
                          <Badge variant="secondary">Team Leader</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedCrew.leader.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedCrew.leader.email}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedCrew.leader.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Certifications</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedCrew.leader.certifications.map((cert, index) => (
                              <Badge key={index} variant="outline">{cert}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="space-y-4">
                        {selectedCrew.members.map((member) => (
                          <div key={member.id} className="p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback>
                                    {member.name.split(" ").map((n) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{member.name}</h4>
                                  <p className="text-sm text-muted-foreground">{member.role}</p>
                                </div>
                              </div>
                              <Badge
                                className={statusColors[member.status]}
                              >
                                {member.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center space-x-2 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{member.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{member.email}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Wrench className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Skills</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {member.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary">{skill}</Badge>
                                ))}
                              </div>
                            </div>
                            <div className="mt-4 space-y-2">
                              <div className="flex items-center space-x-2">
                                <Award className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Certifications</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {member.certifications.map((cert, index) => (
                                  <Badge key={index} variant="outline">{cert}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Schedule</CardTitle>
                    <CardDescription>Manage crew assignments and schedule</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Current Assignment</h4>
                        <Badge variant="outline">In Progress</Badge>
                      </div>
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <p className="font-medium">{selectedCrew.currentJob}</p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>Started: Jan 15, 2024</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex items-center justify-between mt-6">
                        <h4 className="font-medium">Upcoming Assignments</h4>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Assignment
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <p className="font-medium">{selectedCrew.nextJob}</p>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Starts: Feb 1, 2024</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Member Dialog */}
      <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Add a new member to the crew
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="Enter member name" />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carpenter">Carpenter</SelectItem>
                    <SelectItem value="electrician">Electrician</SelectItem>
                    <SelectItem value="plumber">Plumber</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="Enter email" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Skills</Label>
              <Input placeholder="Enter skills (comma separated)" />
            </div>
            <div className="space-y-2">
              <Label>Certifications</Label>
              <Input placeholder="Enter certifications (comma separated)" />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button>Add Member</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
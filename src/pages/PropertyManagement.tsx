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
import { Plus, Search, Edit2, Trash2, MapPin, Share2, Image as ImageIcon, Link as LinkIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Property {
  id: string
  address: string
  size: string
  type: string
  features: string[]
  lastService: string
  nextService: string
  projectStatus: string
  budget: string
  notes: string
  images: {
    id: string
    url: string
    caption: string
    isPublic: boolean
  }[]
  publicGalleryUrl?: string
}

// Sample data with Unsplash images
const properties: Property[] = [
  {
    id: "1",
    address: "123 Main St, Anytown, USA",
    size: "3,500 sqft",
    type: "Custom Home",
    features: ["4 Bedrooms", "3.5 Bathrooms", "Open Concept", "Custom Kitchen"],
    lastService: "2024-01-01",
    nextService: "2024-03-15",
    projectStatus: "Under Construction",
    budget: "$850,000",
    notes: "Modern farmhouse design with high-end finishes",
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
        caption: "Front Elevation",
        isPublic: true
      },
      {
        id: "img2",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        caption: "Kitchen Progress",
        isPublic: true
      },
      {
        id: "img3",
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b",
        caption: "Master Suite",
        isPublic: false
      }
    ],
    publicGalleryUrl: "https://gallery.example.com/project1"
  },
  {
    id: "2",
    address: "456 Oak Ave, Somewhere, USA",
    size: "2,200 sqft",
    type: "Kitchen Remodel",
    features: ["Custom Cabinets", "Island", "High-End Appliances"],
    lastService: "2024-01-02",
    nextService: "2024-01-20",
    projectStatus: "Planning Phase",
    budget: "$125,000",
    notes: "Client requested modern design with smart appliances",
    images: [
      {
        id: "img4",
        url: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
        caption: "Before - Kitchen",
        isPublic: true
      },
      {
        id: "img5",
        url: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77",
        caption: "Design Mockup",
        isPublic: true
      }
    ],
    publicGalleryUrl: "https://gallery.example.com/project2"
  },
  {
    id: "3",
    address: "789 Business Pkwy, Elsewhere, USA",
    size: "15,000 sqft",
    type: "Commercial Renovation",
    features: ["Office Spaces", "Conference Rooms", "Break Room", "Reception Area"],
    lastService: "2024-01-03",
    nextService: "2024-02-28",
    projectStatus: "Permitting",
    budget: "$2,500,000",
    notes: "Complete interior renovation with modern amenities",
    images: [
      {
        id: "img6",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c",
        caption: "Current Office Space",
        isPublic: true
      },
      {
        id: "img7",
        url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
        caption: "3D Rendering",
        isPublic: true
      }
    ],
    publicGalleryUrl: "https://gallery.example.com/project3"
  },
]

export default function PropertyManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  const filteredProperties = properties.filter(
    (property) =>
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statusColors = {
    "Planning Phase": "bg-blue-500",
    "Under Construction": "bg-yellow-500",
    "Permitting": "bg-purple-500",
    "Completed": "bg-green-500",
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Property Management</h1>
          <p className="text-muted-foreground mt-1">Manage your construction and renovation projects</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
              <DialogDescription>
                Enter the details of the new property project.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="details" className="mt-4">
              <TabsList>
                <TabsTrigger value="details">Project Details</TabsTrigger>
                <TabsTrigger value="features">Features & Notes</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter property address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Size</Label>
                    <Input id="size" placeholder="Property size (sqft)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Project Type</Label>
                    <Input id="type" placeholder="e.g., Custom Home, Renovation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input id="budget" placeholder="Project budget" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="features" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="features">Features</Label>
                  <Input id="features" placeholder="Enter features (comma separated)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Project Notes</Label>
                  <Input id="notes" placeholder="Additional notes" />
                </div>
              </TabsContent>
              <TabsContent value="images" className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <ImageIcon className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop images here, or click to select files
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end mt-6">
              <Button>Add Property</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="aspect-video relative overflow-hidden bg-muted">
              {property.images[0] && (
                <img
                  src={property.images[0].url}
                  alt={property.images[0].caption}
                  className="object-cover w-full h-full absolute inset-0"
                />
              )}
              <Badge 
                className={`absolute top-2 right-2 z-10 ${statusColors[property.projectStatus as keyof typeof statusColors]}`}
              >
                {property.projectStatus}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                {property.address}
              </CardTitle>
              <CardDescription>
                {property.type} • {property.size}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {property.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
                {property.features.length > 3 && (
                  <Badge variant="secondary">+{property.features.length - 3} more</Badge>
                )}
              </div>
              <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                {property.notes}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedProperty(property)
                  setIsGalleryDialogOpen(true)
                }}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Gallery
              </Button>
              <div className="space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedProperty(property)
                    setIsShareDialogOpen(true)
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedProperty(property)
                    setIsDetailsDialogOpen(true)
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Gallery Dialog */}
      <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Project Gallery</DialogTitle>
            <DialogDescription>
              Manage and organize project photos
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {selectedProperty?.images.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt={image.caption}
                  className="rounded-lg object-cover w-full aspect-video"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                  <Button variant="secondary" size="sm">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
                <Badge
                  variant={image.isPublic ? "default" : "secondary"}
                  className="absolute top-2 right-2"
                >
                  {image.isPublic ? "Public" : "Private"}
                </Badge>
              </div>
            ))}
            <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
              <ImageIcon className="h-8 w-8 mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Add more photos
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Gallery</DialogTitle>
            <DialogDescription>
              Share the project gallery with clients
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex items-center space-x-2">
              <Input
                value={selectedProperty?.publicGalleryUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button variant="secondary" size="sm">
                <LinkIcon className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Sharing Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="allow-comments" />
                  <label htmlFor="allow-comments">Allow comments</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="password-protect" />
                  <label htmlFor="password-protect">Password protect</label>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
            <DialogDescription>
              View and edit property information
            </DialogDescription>
          </DialogHeader>
          {selectedProperty && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input defaultValue={selectedProperty.address} />
                </div>
                <div className="space-y-2">
                  <Label>Size</Label>
                  <Input defaultValue={selectedProperty.size} />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Input defaultValue={selectedProperty.type} />
                </div>
                <div className="space-y-2">
                  <Label>Budget</Label>
                  <Input defaultValue={selectedProperty.budget} />
                </div>
                <div className="space-y-2">
                  <Label>Project Status</Label>
                  <Input defaultValue={selectedProperty.projectStatus} />
                </div>
                <div className="space-y-2">
                  <Label>Next Service</Label>
                  <Input defaultValue={selectedProperty.nextService} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Features</Label>
                <Input defaultValue={selectedProperty.features.join(", ")} />
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Input defaultValue={selectedProperty.notes} />
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
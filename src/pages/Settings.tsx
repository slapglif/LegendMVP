import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Settings2, Building2, Users2, Mail, Phone, MapPin, Palette, FileText } from "lucide-react"

export default function Settings() {
  const { toast } = useToast()
  const [companySettings, setCompanySettings] = useState({
    name: "Legendary Contractors",
    phone: "(337) 552-5207",
    email: "Sales@LegendaryContractorsLLC.com",
    address: "911 Guillot Rd, Youngsville, LA",
  })

  const [serviceTypes, setServiceTypes] = useState([
    "Custom Home Build",
    "Kitchen Remodel",
    "Bathroom Remodel",
    "Room Addition",
    "Whole House Renovation",
    "Outdoor Living Space",
    "Basement Finishing",
    "Commercial Build-Out",
    "Historic Restoration",
    "Green Building Project"
  ])

  const [newServiceType, setNewServiceType] = useState("")

  const handleSaveCompanySettings = () => {
    toast({
      title: "Settings Saved",
      description: "Company settings have been updated successfully.",
    })
  }

  const handleAddServiceType = () => {
    if (newServiceType.trim()) {
      setServiceTypes([...serviceTypes, newServiceType.trim()])
      setNewServiceType("")
      toast({
        title: "Service Type Added",
        description: "New service type has been added successfully.",
      })
    }
  }

  const handleRemoveServiceType = (index: number) => {
    const newTypes = serviceTypes.filter((_, i) => i !== index)
    setServiceTypes(newTypes)
    toast({
      title: "Service Type Removed",
      description: "Service type has been removed successfully.",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your system configuration</p>
        </div>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Company
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users2 className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Update your company details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={companySettings.name}
                      onChange={(e) =>
                        setCompanySettings({ ...companySettings, name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={companySettings.phone}
                      onChange={(e) =>
                        setCompanySettings({ ...companySettings, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={companySettings.email}
                      onChange={(e) =>
                        setCompanySettings({ ...companySettings, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={companySettings.address}
                      onChange={(e) =>
                        setCompanySettings({ ...companySettings, address: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveCompanySettings}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Service Types</CardTitle>
              <CardDescription>
                Manage the types of services your company offers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Enter new service type"
                  value={newServiceType}
                  onChange={(e) => setNewServiceType(e.target.value)}
                />
                <Button onClick={handleAddServiceType}>Add Service</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {serviceTypes.map((type, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <span>{type}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveServiceType(index)}
                      className="text-destructive hover:text-destructive/90"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">Default User Permissions</p>
                    <p className="text-sm text-muted-foreground">
                      Set default permissions for new users
                    </p>
                  </div>
                </div>
                <Select defaultValue="editor">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all users
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Password Requirements</p>
                    <p className="text-sm text-muted-foreground">
                      Enforce strong password policy
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input type="color" className="w-full h-10" defaultValue="#000000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input type="color" className="w-full h-10" defaultValue="#4A4A4A" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode by default
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Animations</p>
                    <p className="text-sm text-muted-foreground">
                      Enable interface animations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
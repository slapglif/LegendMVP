"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { DataTable, columns } from "@/components/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import { RecentLeads } from "@/components/recent-leads"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { Button } from "@/components/ui/button"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns"

// Sample data - replace with your actual data source
const data = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "(337) 555-0123",
    serviceType: "Lawn Mowing",
    status: "scheduled",
    date: "2023-12-26",
    propertySize: "0.5 acres",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "(337) 555-0124",
    serviceType: "Landscaping",
    status: "new",
    date: "2023-12-25",
    propertySize: "0.25 acres",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "(337) 555-0125",
    serviceType: "Tree Trimming",
    status: "completed",
    date: "2023-12-24",
    propertySize: "0.75 acres",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "(337) 555-0126",
    serviceType: "Lawn Mowing",
    status: "contacted",
    date: "2023-12-23",
    propertySize: "0.3 acres",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@example.com",
    phone: "(337) 555-0127",
    serviceType: "Fertilization",
    status: "follow-up",
    date: "2023-12-22",
    propertySize: "0.4 acres",
  },
]

export default function DashboardPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: new Date(2023, 1, 9),
  })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker date={date} setDate={setDate} />
            <Button variant="default">Download Report</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="w-full max-w-[400px] grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3h-2a4 4 0 0 0-3 3v2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">258</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Scheduled Services
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">
                    For the next 7 days
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32%</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Customers
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3h-2a4 4 0 0 0-3 3v2" />
                    <circle cx="19" cy="7" r="4" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-7">
              <Card className="col-span-1 md:col-span-4">
                <CardHeader>
                  <div className="space-y-2">
                    <CardTitle>Service Requests Overview</CardTitle>
                    <Tabs defaultValue="revenue" className="w-full">
                      <TabsList className="w-full max-w-[200px] grid grid-cols-2">
                        <TabsTrigger value="revenue">Revenue</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-1 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Leads</CardTitle>
                  <CardDescription>
                    You have 5 new leads this week.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentLeads />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            {/* Analytics content */}
          </TabsContent>
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>All Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={data} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


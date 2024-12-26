"use client"

import { useState } from "react"
import { DataTable, columns } from "../components/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Overview } from "../components/overview"
import { RecentLeads } from "../components/recent-leads"
import { Search } from "../components/search"
import { UserNav } from "../components/user-nav"
import { CalendarDateRangePicker } from "../components/date-range-picker"
import { Button } from "../components/ui/button"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns"

// Sample data for the table
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
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker date={date} setDate={setDate} />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-background">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.filter(d => d.status === 'new').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +10.5% from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.filter(d => d.status === 'completed').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +12.3% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.filter(d => d.status === 'scheduled').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +4.1% from last week
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Leads</CardTitle>
                  <CardDescription>
                    You have {data.length} total leads
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentLeads />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="leads" className="space-y-4">
            <div className="flex items-center justify-between">
              <Search />
              <UserNav />
            </div>
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Service Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of services by type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Status Distribution</CardTitle>
                  <CardDescription>
                    Lead status breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Overview />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
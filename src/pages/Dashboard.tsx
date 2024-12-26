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
import { BarChart, PieChart, LineChart } from "../components/analytics-charts"

// Sample data for the table
const data = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "(337) 555-0123",
    serviceType: "Kitchen Remodel",
    status: "scheduled",
    date: "2023-12-26",
    propertySize: "250 sq ft",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "(337) 555-0124",
    serviceType: "Bathroom Renovation",
    status: "new",
    date: "2023-12-25",
    propertySize: "100 sq ft",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "(337) 555-0125",
    serviceType: "Home Addition",
    status: "completed",
    date: "2023-12-24",
    propertySize: "400 sq ft",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "(337) 555-0126",
    serviceType: "Basement Finishing",
    status: "contacted",
    date: "2023-12-23",
    propertySize: "800 sq ft",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@example.com",
    phone: "(337) 555-0127",
    serviceType: "Deck Construction",
    status: "follow-up",
    date: "2023-12-22",
    propertySize: "300 sq ft",
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Revenue by Project Type</CardTitle>
                  <CardDescription>
                    Revenue distribution across different service categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart 
                    data={[
                      { name: "Kitchen Remodels", value: 245000 },
                      { name: "Bathroom Renovations", value: 180000 },
                      { name: "Home Additions", value: 320000 },
                      { name: "Basement Finishing", value: 165000 },
                      { name: "Deck Construction", value: 95000 },
                      { name: "Whole House Reno", value: 450000 }
                    ]}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Status Distribution</CardTitle>
                  <CardDescription>
                    Current project pipeline status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={[
                      { name: "Planning", value: 12 },
                      { name: "In Progress", value: 25 },
                      { name: "Completed", value: 18 },
                      { name: "On Hold", value: 5 },
                      { name: "Delayed", value: 8 }
                    ]}
                  />
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Project Timeline Performance</CardTitle>
                  <CardDescription>
                    Average project completion time trends (in days)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={[
                      { name: "Jan", value: 45 },
                      { name: "Feb", value: 42 },
                      { name: "Mar", value: 48 },
                      { name: "Apr", value: 40 },
                      { name: "May", value: 35 },
                      { name: "Jun", value: 38 }
                    ]}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lead Source Analytics</CardTitle>
                  <CardDescription>
                    Distribution of lead sources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={[
                      { name: "Referrals", value: 35 },
                      { name: "Website", value: 28 },
                      { name: "Social Media", value: 22 },
                      { name: "Home Shows", value: 15 },
                      { name: "Other", value: 10 }
                    ]}
                  />
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Revenue Trends</CardTitle>
                  <CardDescription>
                    Revenue performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={[
                      { name: "Jan", value: 180000 },
                      { name: "Feb", value: 220000 },
                      { name: "Mar", value: 280000 },
                      { name: "Apr", value: 320000 },
                      { name: "May", value: 350000 },
                      { name: "Jun", value: 420000 }
                    ]}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Size Distribution</CardTitle>
                  <CardDescription>
                    Projects by square footage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={[
                      { name: "< 500 sq ft", value: 25 },
                      { name: "500-1000 sq ft", value: 35 },
                      { name: "1000-2000 sq ft", value: 20 },
                      { name: "2000+ sq ft", value: 20 }
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
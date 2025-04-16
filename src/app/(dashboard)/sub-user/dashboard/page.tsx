"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import {
  Briefcase,
  CalendarClock,
  CheckCircle2,
  Clock
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/card"
import { Button } from "@/components/common/button"
import { DataTable } from "@/components/tables/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/tabs"
import DateRangePicker from "@/components/common/date-range-picker"

// Mock data for assigned jobs
const assignedJobsData = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Microsoft",
    status: "OPEN",
    location: "Bangalore",
    applications: 45,
    applyBy: "2023-12-15",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "Google",
    status: "IN_PROGRESS",
    location: "Hyderabad",
    applications: 32,
    applyBy: "2023-12-10",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Amazon",
    status: "OPEN",
    location: "Pune",
    applications: 28,
    applyBy: "2023-12-20",
  },
];

// Mock data for upcoming interviews
const upcomingInterviewsData = [
  {
    id: "1",
    student: "Rahul Sharma",
    job: "Software Engineer",
    company: "Microsoft",
    round: "Technical Interview",
    scheduledAt: "2023-12-10T10:00:00",
  },
  {
    id: "2",
    student: "Priya Patel",
    job: "Software Engineer",
    company: "Microsoft",
    round: "HR Interview",
    scheduledAt: "2023-12-10T14:00:00",
  },
  {
    id: "3",
    student: "Amit Kumar",
    job: "Product Manager",
    company: "Google",
    round: "Case Study",
    scheduledAt: "2023-12-11T11:00:00",
  },
];

// Mock data for application stats
const applicationStatsData = [
  { name: "Applied", value: 120 },
  { name: "Shortlisted", value: 80 },
  { name: "Interviewing", value: 40 },
  { name: "Selected", value: 25 },
  { name: "Rejected", value: 35 },
];

export default function SubUserDashboardPage() {
  const { data: session } = useSession()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  const assignedJobsColumns = [
    {
      accessorKey: "title",
      header: "Job Title",
    },
    {
      accessorKey: "company",
      header: "Company",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const statusMap: Record<string, { color: string; label: string }> = {
          OPEN: { color: "bg-green-100 text-green-800", label: "Open" },
          IN_PROGRESS: { color: "bg-blue-100 text-blue-800", label: "In Progress" },
          COMPLETED: { color: "bg-purple-100 text-purple-800", label: "Completed" },
          CANCELLED: { color: "bg-red-100 text-red-800", label: "Cancelled" },
        }
        const { color, label } = statusMap[status] || { color: "", label: status }
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
            {label}
          </span>
        )
      },
    },
    {
      accessorKey: "applications",
      header: "Applications",
    },
    {
      accessorKey: "applyBy",
      header: "Apply By",
      cell: ({ row }) => {
        const date = new Date(row.getValue("applyBy") as string)
        return date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button 
            variant="link" 
            onClick={() => window.location.href = `/sub-user/jobs/${row.original.id}`}
          >
            View Details
          </Button>
        )
      },
    },
  ]

  const upcomingInterviewsColumns = [
    {
      accessorKey: "student",
      header: "Student",
    },
    {
      accessorKey: "job",
      header: "Job",
    },
    {
      accessorKey: "company",
      header: "Company",
    },
    {
      accessorKey: "round",
      header: "Round",
    },
    {
      accessorKey: "scheduledAt",
      header: "Scheduled At",
      cell: ({ row }) => {
        const date = new Date(row.getValue("scheduledAt") as string)
        return date.toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button 
            variant="link" 
            onClick={() => window.location.href = `/sub-user/interviews/${row.original.id}`}
          >
            Manage
          </Button>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <DateRangePicker />
          <Button>Download Report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              1 in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Interviews</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Next at 10:00 AM
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              2 high priority
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selections</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              +8 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="jobs">Assigned Jobs</TabsTrigger>
          <TabsTrigger value="interviews">Upcoming Interviews</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Assigned Jobs</CardTitle>
              <CardDescription>
                Jobs that have been assigned to you for management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={assignedJobsColumns}
                data={assignedJobsData}
                searchKey="title"
                showPagination={false}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="interviews" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>
                Scheduled interviews that you need to manage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={upcomingInterviewsColumns}
                data={upcomingInterviewsData}
                searchKey="student"
                showPagination={false}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Statistics</CardTitle>
              <CardDescription>
                Overview of applications for your assigned jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={applicationStatsData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

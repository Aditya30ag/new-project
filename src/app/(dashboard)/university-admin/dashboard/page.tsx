"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import {
  Briefcase,
  Building2,
  CheckCheck,
  Clock,
  GraduationCap,
  Users,
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/card"
import { Button } from "@/components/common/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/tabs"
import { DataTable } from "@/components/tables/data-table"
import DateRangePicker from "@/components/common/date-range-picker"

// Mock data - in production, this would come from an API
const placementStatsData = [
  { name: "CSE", applied: 150, interviewed: 120, placed: 90 },
  { name: "ECE", applied: 120, interviewed: 100, placed: 70 },
  { name: "Mechanical", applied: 80, interviewed: 60, placed: 40 },
  { name: "Civil", applied: 60, interviewed: 45, placed: 30 },
  { name: "IT", applied: 130, interviewed: 110, placed: 85 },
]

const companyParticipationData = [
  { name: "Microsoft", students: 45 },
  { name: "Google", students: 30 },
  { name: "Amazon", students: 50 },
  { name: "IBM", students: 25 },
  { name: "TCS", students: 60 },
  { name: "Wipro", students: 40 },
]

const ctcTrendData = [
  { month: "Jan", avgCTC: 7.5 },
  { month: "Feb", avgCTC: 8.2 },
  { month: "Mar", avgCTC: 7.8 },
  { month: "Apr", avgCTC: 8.5 },
  { month: "May", avgCTC: 9.2 },
  { month: "Jun", avgCTC: 10.1 },
]

const jobtypeData = [
  { name: "Full-time", value: 75, color: "#0088FE" },
  { name: "Internship", value: 25, color: "#00C49F" },
]

const recentJobsData = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Microsoft",
    status: "OPEN",
    ctcRange: "15-20 LPA",
    applications: 45,
    createdAt: "2023-10-12",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "Google",
    status: "OPEN",
    ctcRange: "18-25 LPA",
    applications: 32,
    createdAt: "2023-10-10",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Amazon",
    status: "IN_PROGRESS",
    ctcRange: "12-18 LPA",
    applications: 28,
    createdAt: "2023-10-08",
  },
  {
    id: "4",
    title: "Frontend Developer",
    company: "IBM",
    status: "CLOSED",
    ctcRange: "10-15 LPA",
    applications: 38,
    createdAt: "2023-10-05",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Wipro",
    status: "OPEN",
    ctcRange: "8-12 LPA",
    applications: 22,
    createdAt: "2023-10-02",
  },
]

export default function UniversityAdminDashboardPage() {
  const { data: session } = useSession()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  const recentJobsColumns = [
    {
      accessorKey: "title",
      header: "Job Title",
    },
    {
      accessorKey: "company",
      header: "Company",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const statusMap: Record<string, { color: string; label: string }> = {
          OPEN: { color: "bg-green-100 text-green-800", label: "Open" },
          IN_PROGRESS: { color: "bg-blue-100 text-blue-800", label: "In Progress" },
          CLOSED: { color: "bg-gray-100 text-gray-800", label: "Closed" },
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
      accessorKey: "ctcRange",
      header: "CTC Range",
    },
    {
      accessorKey: "applications",
      header: "Applications",
    },
    {
      accessorKey: "createdAt",
      header: "Posted On",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt") as string)
        return date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
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
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">
              +12 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Jobs</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +3 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placements</CardTitle>
            <CheckCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">315</div>
            <p className="text-xs text-muted-foreground">
              +28 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              +5 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="placement-stats">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="placement-stats">Placement Stats</TabsTrigger>
          <TabsTrigger value="company-participation">Company Participation</TabsTrigger>
          <TabsTrigger value="ctc-trends">CTC Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="placement-stats" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Placement Statistics by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={placementStatsData}
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
                    <Bar dataKey="applied" fill="#8884d8" />
                    <Bar dataKey="interviewed" fill="#82ca9d" />
                    <Bar dataKey="placed" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="company-participation" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Participation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={companyParticipationData}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 60,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ctc-trends" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>CTC Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={ctcTrendData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} LPA`, 'Avg CTC']} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="avgCTC"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Job Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobtypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {jobtypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} Jobs`, 'Count']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Recent Jobs</CardTitle>
            <Button variant="outline" size="sm">
              <a href="/university-admin/jobs">View All</a>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={recentJobsColumns}
              data={recentJobsData}
              showPagination={false}
              showColumnToggle={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )

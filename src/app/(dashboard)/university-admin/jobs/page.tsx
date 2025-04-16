"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ArrowUpDown, 
  CirclePlus, 
  Eye, 
  FileEdit, 
  MoreHorizontal, 
  Trash2 
} from "lucide-react"

import { Button } from "@/components/common/button"
import { Input } from "@/components/common/input"
import { DataTable } from "@/components/tables/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/card"
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select"

// Mock data for jobs
const jobsData = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Microsoft",
    location: "Bangalore",
    status: "OPEN",
    ctcRange: "15-20 LPA",
    applications: 45,
    isInternship: false,
    createdAt: "2023-10-12",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "Google",
    location: "Hyderabad",
    status: "OPEN",
    ctcRange: "18-25 LPA",
    applications: 32,
    isInternship: false,
    createdAt: "2023-10-10",
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Amazon",
    location: "Pune",
    status: "IN_PROGRESS",
    ctcRange: "12-18 LPA",
    applications: 28,
    isInternship: false,
    createdAt: "2023-10-08",
  },
  {
    id: "4",
    title: "Frontend Developer",
    company: "IBM",
    location: "Delhi",
    status: "COMPLETED",
    ctcRange: "10-15 LPA",
    applications: 38,
    isInternship: false,
    createdAt: "2023-10-05",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Wipro",
    location: "Chennai",
    status: "OPEN",
    ctcRange: "8-12 LPA",
    applications: 22,
    isInternship: false,
    createdAt: "2023-10-02",
  },
  {
    id: "6",
    title: "Full Stack Intern",
    company: "TCS",
    location: "Bangalore",
    status: "OPEN",
    ctcRange: "25-30K/month",
    applications: 67,
    isInternship: true,
    createdAt: "2023-10-01",
  },
  {
    id: "7",
    title: "ML Engineer",
    company: "Infosys",
    location: "Hyderabad",
    status: "IN_PROGRESS",
    ctcRange: "12-16 LPA",
    applications: 19,
    isInternship: false,
    createdAt: "2023-09-28",
  },
  {
    id: "8",
    title: "UI/UX Designer",
    company: "Accenture",
    location: "Mumbai",
    status: "DRAFT",
    ctcRange: "8-12 LPA",
    applications: 0,
    isInternship: false,
    createdAt: "2023-09-25",
  },
  {
    id: "9",
    title: "Backend Developer",
    company: "Cognizant",
    location: "Pune",
    status: "CANCELLED",
    ctcRange: "10-14 LPA",
    applications: 12,
    isInternship: false,
    createdAt: "2023-09-22",
  },
  {
    id: "10",
    title: "Data Analytics Intern",
    company: "Deloitte",
    location: "Bangalore",
    status: "COMPLETED",
    ctcRange: "20-25K/month",
    applications: 34,
    isInternship: true,
    createdAt: "2023-09-20",
  },
]

export default function JobsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredJobs = jobsData.filter((job) => {
    // Apply search filter
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Apply status filter
    const matchesStatus = 
      statusFilter === "all" || job.status === statusFilter
    
    // Apply type filter
    const matchesType = 
      typeFilter === "all" ||
      (typeFilter === "fulltime" && !job.isInternship) ||
      (typeFilter === "internship" && job.isInternship)
    
    return matchesSearch && matchesStatus && matchesType
  })

  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
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
          DRAFT: { color: "bg-gray-100 text-gray-800", label: "Draft" },
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
      accessorKey: "ctcRange",
      header: "CTC Range",
    },
    {
      accessorKey: "applications",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applications
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "isInternship",
      header: "Type",
      cell: ({ row }) => {
        const isInternship = row.getValue("isInternship") as boolean
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {isInternship ? "Internship" : "Full-time"}
          </span>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Posted On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt") as string)
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
        const job = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/university-admin/jobs/${job.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/university-admin/jobs/${job.id}/edit`}>
                  <FileEdit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  // In a real implementation, we would call an API to delete the job
                  console.log(`Delete job ${job.id}`)
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
        <Button onClick={() => router.push("/university-admin/jobs/create")}>
          <CirclePlus className="mr-2 h-4 w-4" />
          Add New Job
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Listings</CardTitle>
          <CardDescription>
            Manage job listings, track applications, and update job details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search jobs by title, company or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 md:w-1/3">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  value={typeFilter}
                  onValueChange={setTypeFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredJobs}
            searchKey="title"
            exportFileName="jobs-list"
          />
        </CardContent>
      </Card>
    </div>
  )
}


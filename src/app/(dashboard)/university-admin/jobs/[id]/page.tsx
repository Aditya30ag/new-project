"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  FileEdit,
  GraduationCap,
  Home,
  MapPin,
  Users,
} from "lucide-react"

import { Button } from "@/components/common/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/tabs"
import { Badge } from "@/components/common/badge"
import { Separator } from "@/components/common/separator"
import { DataTable } from "@/components/tables/data-table"

// Mock data for a job
const jobData = {
  id: "1",
  title: "Software Engineer",
  company: "Microsoft",
  location: "Bangalore",
  locationType: "ONSITE",
  jobType: "FULL_TIME",
  description: "Microsoft is seeking a talented Software Engineer to join our dynamic team. The ideal candidate will contribute to the development of innovative software solutions that power our products and services. You will work in a collaborative environment with opportunities to learn and grow your skills.",
  status: "OPEN",
  ctcRangeMin: 15,
  ctcRangeMax: 20,
  isInternship: false,
  expectedHires: 5,
  applications: 45,
  applyBy: "2023-11-30",
  requirements: "- Bachelor's degree in Computer Science or related field\n- Strong programming skills in languages such as C#, Java, or Python\n- Experience with web development technologies\n- Problem-solving skills and attention to detail\n- Good communication and teamwork abilities",
  responsibilities: "- Design, develop, and maintain software applications\n- Collaborate with cross-functional teams\n- Debug and resolve software defects\n- Write clean, efficient, and maintainable code\n- Participate in code reviews and knowledge sharing",
  createdAt: "2023-10-12",
  interviewRounds: [
    { id: 1, name: "Technical Screening", description: "Initial technical assessment with coding questions" },
    { id: 2, name: "Technical Interview", description: "Deep dive into technical skills and problem-solving abilities" },
    { id: 3, name: "System Design Round", description: "Evaluation of system design and architecture knowledge" },
    { id: 4, name: "HR Interview", description: "Final round to discuss company culture, expectations, and offer details" },
  ],
  contactPersons: [
    { id: 1, name: "John Doe", email: "john.doe@microsoft.com", phone: "+91 9876543210", designation: "HR Manager" },
    { id: 2, name: "Jane Smith", email: "jane.smith@microsoft.com", phone: "+91 9876543211", designation: "Technical Recruiter" },
  ],
};

// Mock data for applicants
const applicantsData = [
  { id: "1", name: "Rahul Sharma", department: "Computer Science", rollNumber: "CS2001", status: "INTERVIEWING", appliedAt: "2023-10-15" },
  { id: "2", name: "Priya Patel", department: "Computer Science", rollNumber: "CS2005", status: "SHORTLISTED", appliedAt: "2023-10-14" },
  { id: "3", name: "Amit Kumar", department: "Electronics", rollNumber: "EC2010", status: "SELECTED", appliedAt: "2023-10-13" },
  { id: "4", name: "Neha Singh", department: "Computer Science", rollNumber: "CS2015", status: "REJECTED", appliedAt: "2023-10-12" },
  { id: "5", name: "Raj Mehta", department: "Information Technology", rollNumber: "IT2003", status: "OFFER_ACCEPTED", appliedAt: "2023-10-11" },
  { id: "6", name: "Ananya Gupta", department: "Computer Science", rollNumber: "CS2022", status: "INTERVIEWING", appliedAt: "2023-10-10" },
  { id: "7", name: "Vikram Desai", department: "Mechanical", rollNumber: "ME2008", status: "APPLIED", appliedAt: "2023-10-09" },
  { id: "8", name: "Sanjana Roy", department: "Electronics", rollNumber: "EC2019", status: "SHORTLISTED", appliedAt: "2023-10-08" },
];

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const jobId = params.id
  const [activeTab, setActiveTab] = useState("overview")

  // In a real app, we would fetch the job data using the ID
  // For now, we'll just use the mock data
  const job = jobData

  const applicantsColumns = [
    {
      accessorKey: "name",
      header: "Student Name",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "rollNumber",
      header: "Roll Number",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const statusMap: Record<string, { color: string; label: string }> = {
          APPLIED: { color: "bg-blue-100 text-blue-800", label: "Applied" },
          SHORTLISTED: { color: "bg-yellow-100 text-yellow-800", label: "Shortlisted" },
          INTERVIEWING: { color: "bg-purple-100 text-purple-800", label: "Interviewing" },
          SELECTED: { color: "bg-green-100 text-green-800", label: "Selected" },
          REJECTED: { color: "bg-red-100 text-red-800", label: "Rejected" },
          OFFER_ACCEPTED: { color: "bg-emerald-100 text-emerald-800", label: "Offer Accepted" },
          OFFER_DECLINED: { color: "bg-orange-100 text-orange-800", label: "Offer Declined" },
          JOINED: { color: "bg-indigo-100 text-indigo-800", label: "Joined" },
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
      accessorKey: "appliedAt",
      header: "Applied On",
      cell: ({ row }) => {
        const date = new Date(row.getValue("appliedAt") as string)
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
          <Link 
            href={`/university-admin/students/${row.original.id}`}
            className="text-primary hover:underline"
          >
            View Details
          </Link>
        )
      },
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; label: string }> = {
      DRAFT: { color: "bg-gray-100 text-gray-800", label: "Draft" },
      OPEN: { color: "bg-green-100 text-green-800", label: "Open" },
      IN_PROGRESS: { color: "bg-blue-100 text-blue-800", label: "In Progress" },
      COMPLETED: { color: "bg-purple-100 text-purple-800", label: "Completed" },
      CANCELLED: { color: "bg-red-100 text-red-800", label: "Cancelled" },
    }
    const { color, label } = statusMap[status] || { color: "", label: status }
    return (
      <Badge className={color}>{label}</Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">{job.title}</h2>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Building2 className="h-4 w-4" />
          <span>{job.company}</span>
          <Separator orientation="vertical" className="h-4" />
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
          <Separator orientation="vertical" className="h-4" />
          {getStatusBadge(job.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">CTC Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{job.ctcRangeMin} - {job.ctcRangeMax} LPA
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{job.applications}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Apply By</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(job.applyBy).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rounds">Interview Rounds</TabsTrigger>
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
            <TabsTrigger value="contacts">Contact Persons</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={() => router.push(`/university-admin/jobs/${jobId}/edit`)}>
          <FileEdit className="mr-2 h-4 w-4" />
          Edit Job
        </Button>
      </div>

      <TabsContent value="overview" className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{job.description}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{job.requirements}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{job.responsibilities}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1">
                <div className="text-sm text-muted-foreground">Job Type</div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span>
                    {job.jobType.replace("_", " ").charAt(0) +
                      job.jobType.replace("_", " ").slice(1).toLowerCase()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm text-muted-foreground">Location Type</div>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" />
                  <span>
                    {job.locationType.charAt(0) +
                      job.locationType.slice(1).toLowerCase()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm text-muted-foreground">Expected Hires</div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{job.expectedHires}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm text-muted-foreground">Posted On</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {new Date(job.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm text-muted-foreground">Job Status</div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{getStatusBadge(job.status)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-sm text-muted-foreground">Job Category</div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span>{job.isInternship ? "Internship" : "Full-time"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="rounds" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Interview Rounds</CardTitle>
            <CardDescription>
              The interview process consists of {job.interviewRounds.length} rounds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {job.interviewRounds.map((round, index) => (
                <div 
                  key={round.id} 
                  className="flex flex-col md:flex-row gap-4 pb-6 border-b last:border-0 last:pb-0"
                >
                  <div className="md:w-1/4 flex gap-3 items-start">
                    <div className="rounded-full bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium">{round.name}</h3>
                      <p className="text-sm text-muted-foreground">Round {index + 1}</p>
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-sm">{round.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="applicants" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Applicants</CardTitle>
            <CardDescription>
              {applicantsData.length} students have applied for this job
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={applicantsColumns}
              data={applicantsData}
              searchKey="name"
              exportFileName={`${job.company}-${job.title}-applicants`}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contacts" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Persons</CardTitle>
            <CardDescription>
              People to contact regarding this job opportunity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {job.contactPersons.map((contact) => (
                <Card key={contact.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <CardDescription>{contact.designation}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Email:</span> {contact.email}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Phone:</span> {contact.phone}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  )
}

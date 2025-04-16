"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, CirclePlus, Save, Trash2 } from "lucide-react"

import { Button } from "@/components/common/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/form"
import { Input } from "@/components/common/input"
import { Textarea } from "@/components/common/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select"
import { Switch } from "@/components/common/switch"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/tabs"

// Schema for the form validation (same as create job)
const jobFormSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  description: z.string().optional(),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT"]),
  locationType: z.enum(["ONSITE", "REMOTE", "HYBRID"]),
  location: z.string().optional(),
  ctcRangeMin: z.coerce.number().optional(),
  ctcRangeMax: z.coerce.number().optional(),
  isInternship: z.boolean().default(false),
  internshipDuration: z.coerce.number().optional(),
  internshipStipend: z.coerce.number().optional(),
  expectedHires: z.coerce.number().optional(),
  applyBy: z.string().optional(),
  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  status: z.enum(["DRAFT", "OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).default("DRAFT"),
})

// Mock companies data (in a real app this would come from an API)
const companies = [
  { id: "1", name: "Microsoft" },
  { id: "2", name: "Google" },
  { id: "3", name: "Amazon" },
  { id: "4", name: "IBM" },
  { id: "5", name: "TCS" },
  { id: "6", name: "Wipro" },
  { id: "7", name: "Infosys" },
  { id: "8", name: "Accenture" },
  { id: "9", name: "Cognizant" },
  { id: "10", name: "Deloitte" },
]

// Mock job data
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
  internshipDuration: null,
  internshipStipend: null,
  expectedHires: 5,
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

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const jobId = params.id
  
  const [activeTab, setActiveTab] = useState("general")
  const [interviewRounds, setInterviewRounds] = useState(jobData.interviewRounds)

  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: jobData.title,
      company: jobData.company,
      description: jobData.description,
      jobType: jobData.jobType as "FULL_TIME" | "PART_TIME" | "CONTRACT",
      locationType: jobData.locationType as "ONSITE" | "REMOTE" | "HYBRID",
      location: jobData.location,
      ctcRangeMin: jobData.ctcRangeMin,
      ctcRangeMax: jobData.ctcRangeMax,
      isInternship: jobData.isInternship,
      internshipDuration: jobData.internshipDuration || undefined,
      internshipStipend: jobData.internshipStipend || undefined,
      expectedHires: jobData.expectedHires,
      applyBy: jobData.applyBy,
      requirements: jobData.requirements,
      responsibilities: jobData.responsibilities,
      status: jobData.status as "DRAFT" | "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED",
    },
  })

  // Function to add a new interview round
  const addInterviewRound = () => {
    const newId = interviewRounds.length > 0 
      ? Math.max(...interviewRounds.map(round => round.id)) + 1 
      : 1
    
    setInterviewRounds([
      ...interviewRounds,
      { id: newId, name: "", description: "" }
    ])
  }

  // Function to update an interview round
  const updateInterviewRound = (id: number, field: string, value: string) => {
    setInterviewRounds(
      interviewRounds.map(round => 
        round.id === id ? { ...round, [field]: value } : round
      )
    )
  }

  // Function to remove an interview round
  const removeInterviewRound = (id: number) => {
    setInterviewRounds(interviewRounds.filter(round => round.id !== id))
  }

  // Handle form submission
  function onSubmit(values: z.infer<typeof jobFormSchema>) {
    // In a real application, this would call an API to update the job
    console.log(values)
    console.log("Interview rounds:", interviewRounds)
    
    // Redirect to the job detail page
    router.push(`/university-admin/jobs/${jobId}`)
  }

  // Watch for isInternship value to conditionally show/hide internship fields
  const isInternship = form.watch("isInternship")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Edit Job</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-4">
          <TabsTrigger value="general">General Info</TabsTrigger>
          <TabsTrigger value="details">Job Details</TabsTrigger>
          <TabsTrigger value="rounds">Interview Rounds</TabsTrigger>
          <TabsTrigger value="contacts">Contact Persons</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>
                    Basic details about the job opportunity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Software Engineer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a company" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {companies.map((company) => (
                                <SelectItem key={company.id} value={company.name}>
                                  {company.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter job description"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="jobType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select job type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="FULL_TIME">Full Time</SelectItem>
                              <SelectItem value="PART_TIME">Part Time</SelectItem>
                              <SelectItem value="CONTRACT">Contract</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="locationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select location type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ONSITE">Onsite</SelectItem>
                              <SelectItem value="REMOTE">Remote</SelectItem>
                              <SelectItem value="HYBRID">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Bangalore" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="OPEN">Open</SelectItem>
                            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Set to 'Draft' to save without publishing, 'Open' to make it visible to students
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                  <CardDescription>
                    Detailed information about compensation, expectations, and requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="ctcRangeMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum CTC (in LPA)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ctcRangeMax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum CTC (in LPA)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="expectedHires"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expected Number of Hires</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applyBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apply By</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          Last date for students to apply
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isInternship"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>This is an internship opportunity</FormLabel>
                          <FormDescription>
                            Enable this if the job is for internship positions
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  {isInternship && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-l-2 border-primary/20 pl-4">
                      <FormField
                        control={form.control}
                        name="internshipDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Internship Duration (in weeks)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="internshipStipend"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stipend (per month in ₹)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter job requirements"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Skills, qualifications, or experience required for the role
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="responsibilities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Responsibilities</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter job responsibilities"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Key responsibilities and expectations for the role
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rounds">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Rounds</CardTitle>
                  <CardDescription>
                    Define the interview rounds and process
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {interviewRounds.map((round, index) => (
                    <div 
                      key={round.id} 
                      className="grid grid-cols-1 gap-4 p-4 border rounded-md relative"
                    >
                      <div className="absolute -top-3 -left-2 rounded-full bg-primary text-primary-foreground w-7 h-7 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="pt-2">
                        <label className="block text-sm font-medium mb-1">
                          Round Name
                        </label>
                        <Input
                          value={round.name}
                          onChange={(e) => updateInterviewRound(round.id, "name", e.target.value)}
                          placeholder="e.g. Technical Interview"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Description
                        </label>
                        <Textarea
                          value={round.description}
                          onChange={(e) => updateInterviewRound(round.id, "description", e.target.value)}
                          placeholder="Describe this interview round"
                          rows={2}
                        />
                      </div>
                      {interviewRounds.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="absolute top-4 right-4"
                          onClick={() => removeInterviewRound(round.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addInterviewRound}>
                    <CirclePlus className="mr-2 h-4 w-4" />
                    Add Interview Round
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Persons</CardTitle>
                  <CardDescription>
                    Add contact persons for this job
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {jobData.contactPersons.map((contact) => (
                    <div 
                      key={contact.id} 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <Input value={contact.name} readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Designation</label>
                        <Input value={contact.designation} readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <Input value={contact.email} readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <Input value={contact.phone} readOnly />
                      </div>
                    </div>
                  ))}
                  <p className="text-sm text-muted-foreground">
                    To add or remove contact persons, please update the company contacts.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  )
}

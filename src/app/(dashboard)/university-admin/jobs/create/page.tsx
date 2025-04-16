"use client"

import { useState } from "react"
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
import { Checkbox } from "@/components/common/checkbox"
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

// Schema for the form validation
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

export default function CreateJobPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("general")
  const [interviewRounds, setInterviewRounds] = useState([
    { id: 1, name: "Technical Interview", description: "Technical skills assessment" },
  ])

  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      description: "",
      jobType: "FULL_TIME",
      locationType: "ONSITE",
      location: "",
      isInternship: false,
      status: "DRAFT",
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
    // In a real application, this would call an API to save the job
    console.log(values)
    console.log("Interview rounds:", interviewRounds)
    
    // Redirect to the jobs list page
    router.push("/university-admin/jobs")
  }

  // Watch for isInternship value to conditionally show/hide internship fields
  const isInternship = form.watch("isInternship")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Create New Job</h2>
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
                  <p className="text-sm text-muted-foreground">
                    This section would contain a form to add contact persons from the company.
                    In a real implementation, this would be connected to the company's contact database.
                  </p>

                  {/* Placeholder for contact persons form */}
                  <div className="p-8 border border-dashed rounded-md flex flex-col items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      Contact person management UI would be implemented here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Job
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  )
}


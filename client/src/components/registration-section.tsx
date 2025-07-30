import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Upload, Check } from "lucide-react";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  city: z.string().min(2, "City must be at least 2 characters"),
  institution: z.string().min(2, "Institution name required"),
  courseYear: z.string().min(2, "Course and year required"),
  registrationType: z.enum(["individual", "team"]),
  events: z.array(z.string()).min(1, "Select at least one event"),
  teamMembers: z.string().optional(),
  botVerification: z.boolean().refine(val => val === true, "Please verify you're not a robot"),
  termsAccepted: z.boolean().refine(val => val === true, "Please accept terms and conditions")
});

type RegistrationForm = z.infer<typeof registrationSchema>;

interface TeamMember {
  name: string;
  email: string;
  courseYear: string;
}

export default function RegistrationSection() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      registrationType: "individual",
      events: [],
      botVerification: false,
      termsAccepted: false
    }
  });

  const registrationType = form.watch("registrationType");

  const registrationMutation = useMutation({
    mutationFn: async (data: RegistrationForm & { collegeId?: File }) => {
      const formData = new FormData();
      
      // Append all form data
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'events') {
          formData.append(key, JSON.stringify(value));
        } else if (key === 'teamMembers' && value) {
          formData.append(key, value);
        } else if (key !== 'collegeId') {
          formData.append(key, String(value));
        }
      });

      // Append file if present
      if (data.collegeId) {
        formData.append('collegeId', data.collegeId);
      }

      return apiRequest("POST", "/api/registrations", formData);
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Your registration has been submitted successfully. You will receive a confirmation email shortly.",
      });
      form.reset();
      setSelectedEvents([]);
      setTeamMembers([]);
      setUploadedFile(null);
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: RegistrationForm) => {
    const submissionData = {
      ...data,
      events: selectedEvents,
      teamMembers: registrationType === "team" ? JSON.stringify(teamMembers) : undefined,
      collegeId: uploadedFile || undefined
    };
    
    registrationMutation.mutate(submissionData);
  };

  const handleEventChange = (eventId: string, checked: boolean) => {
    if (checked) {
      setSelectedEvents([...selectedEvents, eventId]);
    } else {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    }
    form.setValue("events", checked ? [...selectedEvents, eventId] : selectedEvents.filter(id => id !== eventId));
  };

  const addTeamMember = () => {
    if (teamMembers.length < 3) {
      setTeamMembers([...teamMembers, { name: "", email: "", courseYear: "" }]);
    }
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      setUploadedFile(file);
    }
  };

  const eventOptions = [
    { id: "dramatics", name: "Dramatics", description: "Performance competition" },
    { id: "debate", name: "Debate", description: "Intellectual discourse" },
    { id: "verbal", name: "Verbal Correlations", description: "Word association" },
    { id: "adsap", name: "AdSap", description: "Advertisement making" },
    { id: "decode", name: "Decode", description: "Puzzle solving" }
  ];

  return (
    <section id="registration" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Registration
          </h2>
          <p className="text-lg text-gray-600">
            Join us for an exciting literary symposium experience
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-navy-900">Register for Crisalys 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Registration Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Registration Type</Label>
                <RadioGroup
                  value={registrationType}
                  onValueChange={(value: "individual" | "team") => form.setValue("registrationType", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Individual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="team" id="team" />
                    <Label htmlFor="team">Team</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    {...form.register("fullName")}
                    placeholder="Enter your full name"
                    className="focus:border-navy-900"
                  />
                  {form.formState.errors.fullName && (
                    <p className="text-sm text-red-600">{form.formState.errors.fullName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="your.email@example.com"
                    className="focus:border-navy-900"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    {...form.register("mobile")}
                    placeholder="+1 (555) 000-0000"
                    className="focus:border-navy-900"
                  />
                  {form.formState.errors.mobile && (
                    <p className="text-sm text-red-600">{form.formState.errors.mobile.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    {...form.register("city")}
                    placeholder="Your city"
                    className="focus:border-navy-900"
                  />
                  {form.formState.errors.city && (
                    <p className="text-sm text-red-600">{form.formState.errors.city.message}</p>
                  )}
                </div>
              </div>

              {/* Academic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution *</Label>
                  <Input
                    id="institution"
                    {...form.register("institution")}
                    placeholder="Your college/university"
                    className="focus:border-navy-900"
                  />
                  {form.formState.errors.institution && (
                    <p className="text-sm text-red-600">{form.formState.errors.institution.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseYear">Course & Year *</Label>
                  <Input
                    id="courseYear"
                    {...form.register("courseYear")}
                    placeholder="e.g., B.A. English - 2nd Year"
                    className="focus:border-navy-900"
                  />
                  {form.formState.errors.courseYear && (
                    <p className="text-sm text-red-600">{form.formState.errors.courseYear.message}</p>
                  )}
                </div>
              </div>

              {/* Event Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Select Events *</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  {eventOptions.map((event) => (
                    <label
                      key={event.id}
                      className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedEvents.includes(event.id)}
                        onCheckedChange={(checked) => handleEventChange(event.id, !!checked)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{event.name}</div>
                        <div className="text-sm text-gray-500">{event.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {form.formState.errors.events && (
                  <p className="text-sm text-red-600">{form.formState.errors.events.message}</p>
                )}
              </div>

              {/* Team Members (conditional) */}
              {registrationType === "team" && (
                <div className="space-y-4">
                  <Label className="text-base font-medium">Team Members</Label>
                  <div className="space-y-4">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border">
                        <Input
                          placeholder="Member name"
                          value={member.name}
                          onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                          className="focus:border-navy-900"
                        />
                        <Input
                          type="email"
                          placeholder="Member email"
                          value={member.email}
                          onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                          className="focus:border-navy-900"
                        />
                        <Input
                          placeholder="Course & year"
                          value={member.courseYear}
                          onChange={(e) => updateTeamMember(index, 'courseYear', e.target.value)}
                          className="focus:border-navy-900"
                        />
                      </div>
                    ))}
                  </div>
                  {teamMembers.length < 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTeamMember}
                      className="border-navy-900 text-navy-900 hover:navy-900 hover:text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Team Member
                    </Button>
                  )}
                </div>
              )}

              {/* File Upload */}
              <div className="space-y-3">
                <Label className="text-base font-medium">College ID Upload *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-navy-900 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="collegeId"
                  />
                  <label htmlFor="collegeId" className="cursor-pointer">
                    {uploadedFile ? (
                      <div>
                        <Check className="text-3xl text-green-500 mb-2 mx-auto" />
                        <p className="text-green-600 mb-2">File uploaded successfully</p>
                        <p className="text-sm text-gray-500">{uploadedFile.name}</p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="text-3xl text-gray-400 mb-2 mx-auto" />
                        <p className="text-gray-600 mb-2">Click to upload your college ID</p>
                        <p className="text-sm text-gray-500">PNG, JPG, or PDF (max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Bot Prevention */}
              <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-lg">
                <Checkbox
                  id="botVerification"
                  {...form.register("botVerification")}
                />
                <Label htmlFor="botVerification" className="text-sm">
                  I'm not a robot (simple verification)
                </Label>
              </div>
              {form.formState.errors.botVerification && (
                <p className="text-sm text-red-600">{form.formState.errors.botVerification.message}</p>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="termsAccepted"
                  {...form.register("termsAccepted")}
                  className="mt-1"
                />
                <Label htmlFor="termsAccepted" className="text-sm leading-relaxed">
                  I agree to the terms and conditions and understand that all event rules must be followed.
                </Label>
              </div>
              {form.formState.errors.termsAccepted && (
                <p className="text-sm text-red-600">{form.formState.errors.termsAccepted.message}</p>
              )}

              {/* Submit Button */}
              <div className="text-center pt-4">
                <Button
                  type="submit"
                  disabled={registrationMutation.isPending}
                  className="navy-900 hover:navy-800 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  {registrationMutation.isPending ? "Submitting..." : "Complete Registration"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

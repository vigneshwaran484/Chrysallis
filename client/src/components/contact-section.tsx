import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Clock, Car, User, Mail, Phone } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Contact & Venue
          </h2>
          <p className="text-lg text-gray-600">
            Get in touch with us for any queries or additional information
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-navy-900">Event Coordinators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start">
                  <div className="gold-400 rounded-full p-3 mr-4">
                    <User className="text-navy-900 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">Dr. Sarah Johnson</h4>
                    <p className="text-gray-600">Department Head, English Literature</p>
                    <p className="text-gray-600 flex items-center mt-1">
                      <Mail className="w-4 h-4 mr-2" />
                      sarah.johnson@sjc.edu
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="gold-400 rounded-full p-3 mr-4">
                    <User className="text-navy-900 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">Prof. Michael Chen</h4>
                    <p className="text-gray-600">Event Coordinator</p>
                    <p className="text-gray-600 flex items-center mt-1">
                      <Mail className="w-4 h-4 mr-2" />
                      michael.chen@sjc.edu
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      +1 (555) 234-5678
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-navy-900">Venue Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-gold-400 mt-1 mr-3 w-5 h-5" />
                  <div>
                    <h4 className="font-semibold text-navy-900">St. Joseph's College</h4>
                    <p className="text-gray-600">123 Academic Drive<br />Literature Campus<br />University City, UC 12345</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="text-gold-400 mt-1 mr-3 w-5 h-5" />
                  <div>
                    <h4 className="font-semibold text-navy-900">Event Timing</h4>
                    <p className="text-gray-600">March 15-16, 2024<br />9:00 AM - 6:00 PM both days</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Car className="text-gold-400 mt-1 mr-3 w-5 h-5" />
                  <div>
                    <h4 className="font-semibold text-navy-900">Facilities</h4>
                    <p className="text-gray-600">Free parking available<br />Cafeteria and refreshments<br />WiFi access throughout campus</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-2xl text-navy-900">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Your name"
                    className="focus:border-navy-900"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
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
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select onValueChange={(value) => form.setValue("subject", value)}>
                    <SelectTrigger className="focus:border-navy-900">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="registration">Registration Query</SelectItem>
                      <SelectItem value="events">Event Information</SelectItem>
                      <SelectItem value="venue">Venue & Logistics</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.subject && (
                    <p className="text-sm text-red-600">{form.formState.errors.subject.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    {...form.register("message")}
                    rows={4}
                    placeholder="Your message here..."
                    className="focus:border-navy-900"
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm text-red-600">{form.formState.errors.message.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full navy-900 hover:navy-800 text-white font-semibold"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

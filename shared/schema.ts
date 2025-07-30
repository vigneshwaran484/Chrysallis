import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const registrations = pgTable("registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile").notNull(),
  city: text("city").notNull(),
  institution: text("institution").notNull(),
  courseYear: text("course_year").notNull(),
  registrationType: text("registration_type").notNull(), // 'individual' or 'team'
  events: text("events").array().notNull(),
  teamMembers: text("team_members"), // JSON string for team member details
  collegeIdPath: text("college_id_path"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  createdAt: true,
}).extend({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  city: z.string().min(2, "City must be at least 2 characters"),
  institution: z.string().min(2, "Institution name required"),
  courseYear: z.string().min(2, "Course and year required"),
  registrationType: z.enum(["individual", "team"]),
  events: z.array(z.string()).min(1, "Select at least one event"),
  teamMembers: z.string().optional(),
  collegeIdPath: z.string().optional(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Event types for the symposium
export interface Event {
  id: string;
  name: string;
  category: "performance" | "verbal" | "creative";
  description: string;
  teamSize: string;
  duration: string;
  date: string;
  time: string;
  rules: string[];
  judgingCriteria: string[];
  disqualificationRules: string[];
}

export const events: Event[] = [
  {
    id: "dramatics",
    name: "Dramatics",
    category: "performance",
    description: "Showcase your theatrical talents through diverse performance formats including drama, comedy, and mime.",
    teamSize: "Solo or 2-3 participants",
    duration: "5-10 minutes",
    date: "March 15, 2024",
    time: "10:00 AM",
    rules: [
      "Performance time: 5-10 minutes",
      "Props and costumes require organizer approval",
      "Only pre-approved MP3 tracks on CDs allowed",
      "No vulgarity or offensive content",
      "No pen drives allowed"
    ],
    judgingCriteria: [
      "Creativity and originality",
      "Acting skills and stage presence", 
      "Adherence to time limits",
      "Overall impact"
    ],
    disqualificationRules: [
      "Any act of vulgarity or obscenity",
      "Violation of institution's code of conduct",
      "Late arrival will not be permitted"
    ]
  },
  {
    id: "debate",
    name: "Debate",
    category: "verbal",
    description: "Engage in intellectual discourse through structured debates with direct finals format.",
    teamSize: "Teams of 3 speakers",
    duration: "8 min + 4 min reply",
    date: "March 15, 2024",
    time: "2:00 PM",
    rules: [
      "Direct finals format with two teams",
      "8 minutes per substantive speech",
      "4 minutes per reply speech",
      "No communication during speeches",
      "Only registered speakers may speak"
    ],
    judgingCriteria: [
      "Content quality and research",
      "Style and delivery",
      "Strategy and rebuttals",
      "Overall persuasiveness"
    ],
    disqualificationRules: [
      "Communication with audience during speeches",
      "Attempting to influence judges",
      "Arguing with judge's decision"
    ]
  },
  {
    id: "verbal",
    name: "Verbal Correlations",
    category: "verbal",
    description: "Demonstrate quick thinking by connecting words, phrases, and concepts with logical correlations.",
    teamSize: "Individual or pairs",
    duration: "1-2 minutes per response",
    date: "March 16, 2024",
    time: "10:00 AM",
    rules: [
      "Connect given words/phrases logically",
      "1-2 minutes per response",
      "No offensive language allowed",
      "Answers must be logical and clear"
    ],
    judgingCriteria: [
      "Creativity in connections",
      "Clarity of explanation",
      "Logical reasoning",
      "Presence of mind"
    ],
    disqualificationRules: [
      "Use of inappropriate language",
      "Exceeding time limits",
      "Illogical or offensive connections"
    ]
  },
  {
    id: "adsap",
    name: "AdSap",
    category: "creative",
    description: "Create compelling advertisements using creativity and presentation skills in various formats.",
    teamSize: "2-4 participants",
    duration: "2-3 minutes presentation",
    date: "March 16, 2024",
    time: "2:00 PM",
    rules: [
      "15-30 minutes preparation time",
      "Original content only (no plagiarism)",
      "Any format: skit, video, jingle",
      "Teams arrange their own props",
      "2-3 minutes presentation time"
    ],
    judgingCriteria: [
      "Creativity and innovation",
      "Impact and message clarity",
      "Presentation skills",
      "Adherence to time limits",
      "Originality"
    ],
    disqualificationRules: [
      "Plagiarism of any kind",
      "Vulgar or offensive content",
      "Content offensive to political/religious sentiments"
    ]
  },
  {
    id: "decode",
    name: "Decode",
    category: "creative",
    description: "Solve puzzles and decode encrypted messages using analytical thinking and problem-solving skills.",
    teamSize: "Individual or pairs",
    duration: "Time-limited rounds",
    date: "March 16, 2024",
    time: "4:00 PM",
    rules: [
      "Decode clues and encrypted messages",
      "Submit answers within time limits",
      "No external devices or help allowed",
      "Tie-breaker rounds if necessary"
    ],
    judgingCriteria: [
      "Accuracy of solutions",
      "Speed of completion",
      "Problem-solving approach",
      "Logical reasoning"
    ],
    disqualificationRules: [
      "Use of mobile phones or smart devices",
      "External help or assistance",
      "Misconduct or harassment"
    ]
  }
];

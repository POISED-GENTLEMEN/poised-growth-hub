import { z } from "zod";

// Common validation helpers
const phoneRegex = /^\+?[\d\s\-()]+$/;

// Newsletter validation
export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  firstName: z.string().trim().min(1, "First name is required").max(100, "First name must be less than 100 characters").optional(),
});

// General contact form
export const contactGeneralSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().regex(phoneRegex, "Please enter a valid phone number").max(20, "Phone number must be less than 20 characters").optional().or(z.literal("")),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
  newsletter: z.boolean().optional(),
});

// Partnership contact form
export const contactPartnershipSchema = z.object({
  orgName: z.string().trim().min(1, "Organization name is required").max(150, "Organization name must be less than 150 characters"),
  contactPerson: z.string().trim().min(1, "Contact person is required").max(100, "Contact person must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().regex(phoneRegex, "Please enter a valid phone number").max(20, "Phone number must be less than 20 characters").optional().or(z.literal("")),
  orgType: z.string().min(1, "Please select organization type"),
  participants: z.string().min(1, "Please indicate number of participants"),
  challenge: z.string().trim().min(10, "Please describe the challenge (at least 10 characters)").max(2000, "Description must be less than 2000 characters"),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
  hearAbout: z.string().trim().max(200, "Response must be less than 200 characters").optional().or(z.literal("")),
});

// Checkout form
export const checkoutSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().regex(phoneRegex, "Please enter a valid phone number").max(20, "Phone number must be less than 20 characters").optional().or(z.literal("")),
  firstName: z.string().trim().min(1, "First name is required").max(100, "First name must be less than 100 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(100, "Last name must be less than 100 characters"),
  address: z.string().trim().min(5, "Address is required").max(200, "Address must be less than 200 characters"),
  address2: z.string().trim().max(200, "Address line 2 must be less than 200 characters").optional().or(z.literal("")),
  city: z.string().trim().min(1, "City is required").max(100, "City must be less than 100 characters"),
  state: z.string().trim().min(2, "State is required").max(50, "State must be less than 50 characters"),
  zip: z.string().trim().min(3, "ZIP code is required").max(20, "ZIP code must be less than 20 characters"),
  country: z.string().trim().min(1, "Country is required").max(100, "Country must be less than 100 characters"),
});

// Youth program inquiry
export const youthProgramSchema = z.object({
  parentName: z.string().trim().min(1, "Parent/Guardian name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().regex(phoneRegex, "Please enter a valid phone number").max(20, "Phone number must be less than 20 characters"),
  studentName: z.string().trim().min(1, "Student name is required").max(100, "Name must be less than 100 characters"),
  studentAge: z.string().trim().min(1, "Student age is required"),
  challenges: z.string().trim().min(10, "Please describe the challenges (at least 10 characters)").max(1000, "Description must be less than 1000 characters"),
  startDate: z.string().min(1, "Please select a start date"),
  referralSource: z.string().trim().max(200, "Response must be less than 200 characters").optional().or(z.literal("")),
});

// Program partners form
export const programPartnerSchema = z.object({
  organizationName: z.string().trim().min(1, "Organization name is required").max(150, "Organization name must be less than 150 characters"),
  name: z.string().trim().min(1, "Contact name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().regex(phoneRegex, "Please enter a valid phone number").max(20, "Phone number must be less than 20 characters").optional().or(z.literal("")),
  organizationType: z.string().min(1, "Please select organization type"),
  participantCount: z.string().min(1, "Please indicate participant count"),
  implementationModel: z.array(z.string()).min(1, "Please select at least one implementation model"),
  timeline: z.string().min(1, "Please select a timeline"),
  additionalInfo: z.string().trim().max(2000, "Additional information must be less than 2000 characters").optional().or(z.literal("")),
});

// Resource download form
export const resourceDownloadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  newsletter: z.boolean().optional(),
});

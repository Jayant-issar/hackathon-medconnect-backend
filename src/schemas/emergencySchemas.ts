import { z } from "zod";

export const createEmergencySchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  location: z.string().min(3, { message: "Location must be specified" }),
  contactName: z.string().min(3, { message: "Contact name must be provided" }),
  contactPhone: z.string().min(10, { message: "Contact phone must be valid" }), // Basic phone validation
  urgencyLevel: z.string(), // Consider making this an enum validation if you have specific urgency levels
  description: z.string().optional(),
  hospitalName: z.string().optional(),
  userId: z.string(), // Assuming userId is mandatory to link to a user
});

export type CreateEmergencyType = z.infer<typeof createEmergencySchema>;


export const updateEmergencySchema = createEmergencySchema.partial(); // Makes all fields optional
export type UpdateEmergencyType = z.infer<typeof updateEmergencySchema>; 
import { z } from "zod";

export const createEmergencySchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  location: z.string().min(3, { message: "Location must be specified" }),
  contactName: z.string().min(3, { message: "Contact name must be provided" }),
  contactPhone: z.string().min(10, { message: "Contact phone must be valid" }), 
  urgencyLevel: z.string(),
  description: z.string().optional(),
  hospitalName: z.string().optional(),
  userId: z.string(), 
});

export type CreateEmergencyType = z.infer<typeof createEmergencySchema>;


export const updateEmergencySchema = createEmergencySchema.partial(); // Makes all fields optional
export type UpdateEmergencyType = z.infer<typeof updateEmergencySchema>; 
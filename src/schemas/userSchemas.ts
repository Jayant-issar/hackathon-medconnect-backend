import { z } from "zod";

export const onboardUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  bloodType: z.string().optional(), // Consider making this an enum validation
  role: z.enum(["USER", "ADMIN"]).optional(), // Assuming UserRole enum from Prisma schema
  clerkId: z.string()
});

export type OnboardUserType = z.infer<typeof onboardUserSchema>;

export const updateUserProfileSchema = z.object({
  name: z.string().optional(),
  bloodType: z.string().optional(), // Consider making this an enum validation
  role: z.enum(["USER", "ADMIN"]).optional(), // Assuming UserRole enum from Prisma schema
  location: z.string().optional(), // Consider more specific location format validation
});

export type UpdateUserProfileType = z.infer<typeof updateUserProfileSchema>; 
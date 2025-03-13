import { z } from "zod";

export const updateBedAvailabilitySchema = z.object({
  available: z.number().min(0),
});

export type UpdateBedAvailabilityType = z.infer<typeof updateBedAvailabilitySchema>; 
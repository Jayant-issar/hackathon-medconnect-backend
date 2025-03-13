import { z } from "zod";

export const createBloodBankSchema = z.object({
  name: z.string(), // Name is mandatory for creation
  address: z.string(), // Address is mandatory for creation
  phone: z.string(), // Phone is mandatory for creation
  latitude: z.number(), // Latitude is mandatory for creation
  longitude: z.number(), // Longitude is mandatory for creation
});

export type CreateBloodBankType = z.infer<typeof createBloodBankSchema>;

// Example schema for updating BloodBank information (adjust as needed)
export const updateBloodBankSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  // inventory updates would likely be handled separately
});

export type UpdateBloodBankType = z.infer<typeof updateBloodBankSchema>;

export const updateBloodBankInventorySchema = z.object({
  inventory: z.array(
    z.object({
      bloodGroup: z.enum([
        "A_POSITIVE",
        "A_NEGATIVE",
        "B_POSITIVE",
        "B_NEGATIVE",
        "AB_POSITIVE",
        "AB_NEGATIVE",
        "O_POSITIVE",
        "O_NEGATIVE",
      ]),
      units: z.number().int().min(0), // Ensure units are non-negative integers
    })
  ),
});

export type UpdateBloodBankInventoryType = z.infer<typeof updateBloodBankInventorySchema>;

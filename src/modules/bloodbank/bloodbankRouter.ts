import { Hono } from "hono";
import { BloodBankService } from "./bloodbankService";
import { BloodBankController } from "./bloodbankController";
import { db } from "../../lib/db";
import { validateRequest } from "../../middleware/validateRequest";
import { createBloodBankSchema, updateBloodBankSchema, updateBloodBankInventorySchema } from "../../schemas/bloodbankSchemas";
import { dummyBloodBanks } from "../../../prisma/dummyData"; // Import dummyBloodBanks

// Initialize services and controllers
const bloodBankService = new BloodBankService(db);
const bloodBankController = new BloodBankController(bloodBankService);

// Create router
export const bloodBankRouter = new Hono();

// Routes
bloodBankRouter.get("/", (c) => bloodBankController.getAllBloodBanks(c));
bloodBankRouter.get("/:id", (c) => bloodBankController.getBloodBankById(c));
bloodBankRouter.post("/", validateRequest(createBloodBankSchema), (c) => bloodBankController.createBloodBank(c));
bloodBankRouter.put("/:id", validateRequest(updateBloodBankSchema), (c) => bloodBankController.updateBloodBank(c));
bloodBankRouter.delete("/:id", (c) => bloodBankController.deleteBloodBank(c));
bloodBankRouter.put("/:id/inventory", validateRequest(updateBloodBankInventorySchema), (c) => bloodBankController.updateBloodBankInventory(c));

// New route to seed blood banks
// bloodBankRouter.get("/seed", async (c) => {
//   try {
//     for (const dummyBank of dummyBloodBanks) {
//       // Location and inventory are not directly part of the CreateBloodBankType
//       const { location, inventory, ...bloodBankData } = dummyBank;

//       // First create the BloodBank without inventory
//       const createdBloodBank = await db.bloodBank.create({ data: {
//         address: bloodBankData.address,
//         name: bloodBankData.name,
//         phone: bloodBankData.phone,
//         latitude: location.lat,
//         longitude: location.lng,
//       } });

//       // Then create BloodInventory entries and connect them to the BloodBank
//       if (inventory && inventory.length > 0) {
//         for (const inventoryItem of inventory) {
//           await db.bloodInventory.create({
//             data: {
//               bloodGroup: inventoryItem.bloodGroup.replace('+', '_POSITIVE').replace('-', '_NEGATIVE') as any, // Transform BloodGroup enum
//               units: inventoryItem.units,
//               bloodBankId: createdBloodBank.id,
//             },
//           });
//         }
//       }
//     }
//     return c.json({ message: "Dummy blood banks seeded successfully with inventory" });
//   } catch (error) {
//     console.error("Failed to seed dummy blood banks with inventory:", error);
//     return c.json({ message: "Failed to seed dummy blood banks with inventory", error: error instanceof Error ? error.message : "Unknown error" }, 500);
//   }
// });

// Base route - for health check or info
bloodBankRouter.get("/", (c) => {
  return c.json({
    message: "Blood Bank API is running",
  });
}); 
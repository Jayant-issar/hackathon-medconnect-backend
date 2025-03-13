import { Hono } from "hono";
import { BloodBankService } from "./bloodbankService";
import { BloodBankController } from "./bloodbankController";
import { db } from "../../lib/db";
import { validateRequest } from "../../middleware/validateRequest";
import { createBloodBankSchema, updateBloodBankSchema, updateBloodBankInventorySchema } from "../../schemas/bloodbankSchemas";

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

// Base route - for health check or info
bloodBankRouter.get("/", (c) => {
  return c.json({
    message: "Blood Bank API is running",
  });
}); 
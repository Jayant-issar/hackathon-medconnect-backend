import { Hono } from "hono";
import { EmergencyController } from "./emergencyController";
import { EmergencyService } from "./emergencyService";
import { db } from "../../lib/db";
import { validateRequest } from "../../middleware/validateRequest";
import { createEmergencySchema, updateEmergencySchema } from "../../schemas/emergencySchemas";

// Initialize services and controllers
const emergencyService = new EmergencyService(db);
const emergencyController = new EmergencyController(emergencyService);

// Create router
export const emergencyRouter = new Hono();

emergencyRouter.get("/", (c) => emergencyController.getAllEmergencies(c));
emergencyRouter.get("/:id", (c) => emergencyController.getEmergencyById(c));
emergencyRouter.post("/", validateRequest(createEmergencySchema), (c) => emergencyController.createEmergency(c));
emergencyRouter.put("/:id", validateRequest(updateEmergencySchema), (c) => emergencyController.updateEmergency(c));
emergencyRouter.delete("/:id", (c) => emergencyController.deleteEmergency(c)); 
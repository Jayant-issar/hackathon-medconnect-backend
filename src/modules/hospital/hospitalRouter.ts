import { Hono } from "hono";
import { HospitalService } from "./hospitalService";
import { HospitalController } from "./hospitalController";
import { db } from "../../lib/db";
import { validateRequest } from "../../middleware/validateRequest";
import { updateBedAvailabilitySchema } from "../../schemas/hospitalSchemas";

// Initialize services and controllers
const hospitalService = new HospitalService(db);
const hospitalController = new HospitalController(hospitalService);

// Create router
export const hospitalRouter = new Hono();

// Routes
hospitalRouter.get("/", (c) => hospitalController.getAllHospitals(c));
hospitalRouter.get("/:id", (c) => hospitalController.getHospitalById(c));
hospitalRouter.put("/:hospitalId/beds/:bedId", validateRequest(updateBedAvailabilitySchema), (c) => hospitalController.updateBedAvailability(c)); 
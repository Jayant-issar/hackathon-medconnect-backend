import { Hono } from "hono";
import { HospitalService } from "./hospitalService";
import { HospitalController } from "./hospitalController";
import { db } from "../../lib/db";
import { validateRequest } from "../../middleware/validateRequest";
import { updateBedAvailabilitySchema } from "../../schemas/hospitalSchemas";
import { dummyHospitals } from "../../../prisma/dummyData";

// Initialize services and controllers
const hospitalService = new HospitalService(db);
const hospitalController = new HospitalController(hospitalService);

// Create router
export const hospitalRouter = new Hono();

// Routes
hospitalRouter.get("/", (c) => hospitalController.getAllHospitals(c));
hospitalRouter.get("/:id", (c) => hospitalController.getHospitalById(c));
hospitalRouter.put("/:hospitalId/beds/:bedId", validateRequest(updateBedAvailabilitySchema), (c) => hospitalController.updateBedAvailability(c)); 


// hospitalRouter.get("/seed", async (c) => {
//     console.log("Seeding dummy hospitals...");
//     try {
        
//         await Promise.all(dummyHospitals.map(async (hospital) => {
//                 let createdHospital = await db.hospital.create({
//                 data:{
//                     address: hospital.address,
//                     name: hospital.name,
//                     phone: hospital.phone,
//                     latitude: hospital.location.lat,
//                     longitude: hospital.location.lng,

//                 }

//             })


//             await Promise.all(hospital.beds.map(async (bed)=>{
//                 await db.bedInformation.create({
//                     data:{
//                         available: bed.available,
//                         total: bed.total,
//                         type: bed.type,
//                         Hospital:{
//                             connect:{id: createdHospital.id}
//                         }
//                     }
//                 })
//             }))
//             console.log("Hospital seeded:", createdHospital);

//         }))


//         return c.json({message: "Dummy hospitals seeded successfully"});
        
//     } catch (error) {
//         console.error("Error seeding dummy hospitals:", error);
//         return c.json({message: "Error seeding dummy hospitals"}, 500);
//     }
// });
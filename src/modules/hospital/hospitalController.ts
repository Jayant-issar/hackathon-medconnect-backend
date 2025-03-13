import { Context } from "hono";
import { HospitalService } from "./hospitalService";
import { updateBedAvailabilitySchema } from "../../schemas/hospitalSchemas"; // Import schema

export class HospitalController {
  constructor(private hospitalService: HospitalService) {}

  async getAllHospitals(c: Context) {
    try {
      const hospitals = await this.hospitalService.getAllHospitals();
      
      return c.json({
        success: true,
        data: hospitals
      });
    } catch (error) {
      console.error("Error in getAllHospitals controller:", error);
      return c.json(
        { success: false, message: error instanceof Error ? error.message : "Server error" },
        500
      );
    }
  }

  async getHospitalById(c: Context) {
    try {
      const hospitalId = c.req.param("id");
      const hospital = await this.hospitalService.getHospitalById(hospitalId);
      
      return c.json({
        success: true,
        data: hospital
      });
    } catch (error) {
      console.error("Error in getHospitalById controller:", error);
      return c.json(
        { success: false, message: error instanceof Error ? error.message : "Server error" },
        error instanceof Error && error.message === "Hospital not found" ? 404 : 500
      );
    }
  }

  async updateBedAvailability(c: Context) {
    try {
      const hospitalId = c.req.param("hospitalId");
      const bedId = c.req.param("bedId");
      const rawData = await c.req.json();
      const validatedData = updateBedAvailabilitySchema.parse(rawData); // Validate request body

      const updatedBed = await this.hospitalService.updateBedAvailability(
        hospitalId,
        bedId,
        validatedData
      );

      return c.json({
        success: true,
        data: updatedBed,
        message: "Bed availability updated successfully"
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Validation Error in updateBedAvailability controller:", error);
        return c.json(
          { success: false, message: "Validation error", errors: error }, // Return validation errors
          400
        );
      }
      console.error("Server Error in updateBedAvailability controller:", error);
      return c.json(
        { success: false, message: "Server error" },
        500
      );
    }
  }
} 
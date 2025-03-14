import { Context } from "hono";
import { EmergencyService } from "./emergencyService";
import { CreateEmergencyType, UpdateEmergencyType } from "../../schemas/emergencySchemas";

export class EmergencyController {
    constructor(private emergencyService: EmergencyService) {}

    async getAllEmergencies(c: Context) {
        try {
            const emergencies = await this.emergencyService.getAllEmergencies();
            return c.json(emergencies);
        } catch (error: any) {
            console.error("🔴 Error in getAllEmergencies controller:", error);
            return c.json({ message: error.message }, 500);
        }
    }

    async getEmergencyById(c: Context) {
        const id = c.req.param("id");
        try {
            const emergency = await this.emergencyService.getEmergencyById(id);
            if (!emergency) {
                return c.json({ message: "Emergency not found" }, 404);
            }
            return c.json(emergency);
        } catch (error: any) {
            console.error("🔴 Error in getEmergencyById controller:", error);
            return c.json({ message: error.message }, 500);
        }
    }

    async createEmergency(c: Context) {
        try {
            const data = await c.req.json<CreateEmergencyType>();
            const newEmergency = await this.emergencyService.createEmergency(data);
            return c.json(newEmergency, 201); // 201 Created status
        } catch (error: any) {
            console.error("🔴 Error in createEmergency controller:", error);
            return c.json({ message: error.message }, 500);
        }
    }

    async updateEmergency(c: Context) {
        const id = c.req.param("id");
        try {
            const data = await c.req.json<UpdateEmergencyType>();
            const updatedEmergency = await this.emergencyService.updateEmergency(id, data);
            if (!updatedEmergency) {
                return c.json({ message: "Emergency not found" }, 404);
            }
            return c.json(updatedEmergency);
        } catch (error: any) {
            console.error("🔴 Error in updateEmergency controller:", error);
            return c.json({ message: error.message }, 500);
        }
    }

    async deleteEmergency(c: Context) {
        const id = c.req.param("id");
        try {
            const deletedEmergency = await this.emergencyService.deleteEmergency(id);
            if (!deletedEmergency) {
                return c.json({ message: "Emergency not found" }, 404);
            }
            return c.json({ message: "Emergency deleted successfully" });
        } catch (error: any) {
            console.error("🔴 Error in deleteEmergency controller:", error);
            return c.json({ message: error.message }, 500);
        }
    }
} 
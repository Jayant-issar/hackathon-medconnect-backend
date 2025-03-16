import { db } from "../../lib/db";
import { Emergency } from "@prisma/client";
import { CreateEmergencyType, UpdateEmergencyType } from "../../schemas/emergencySchemas";

export class EmergencyService {
    private prisma: typeof db;

    constructor(prisma: typeof db) {
        this.prisma = prisma;
    }

    async getAllEmergencies(): Promise<Emergency[]> {
        try {
            const emergencies = await this.prisma.emergency.findMany({
                include:{
                    
                }
            });
            return emergencies;
        } catch (error) {
            console.error("🔴 Error in getAllEmergencies service:", error);
            throw new Error(`Failed to fetch emergencies: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }

    async getEmergencyById(id: string): Promise<Emergency | null> {
        try {
            const emergency = await this.prisma.emergency.findUnique({
                where: { id }
            });
            return emergency;
        } catch (error) {
            console.error("🔴 Error in getEmergencyById service:", error);
            throw new Error(`Failed to fetch emergency by ID: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }

    async createEmergency(data: CreateEmergencyType): Promise<Emergency> {
        try {
            const emergency = await this.prisma.emergency.create({
                data
            });
            return emergency;
        } catch (error) {
            console.error("🔴 Error in createEmergency service:", error);
            throw new Error(`Failed to create emergency: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }

    async updateEmergency(id: string, data: UpdateEmergencyType): Promise<Emergency | null> {
        try {
            const emergency = await this.prisma.emergency.update({
                where: { id },
                data
            });
            return emergency;
        } catch (error) {
            console.error("🔴 Error in updateEmergency service:", error);
            throw new Error(`Failed to update emergency: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }

    async deleteEmergency(id: string): Promise<Emergency | null> {
        try {
            const emergency = await this.prisma.emergency.delete({
                where: { id }
            });
            return emergency;
        } catch (error) {
            console.error("🔴 Error in deleteEmergency service:", error);
            throw new Error(`Failed to delete emergency: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }
} 
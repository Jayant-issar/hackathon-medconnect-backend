import { db } from "../../lib/db";
import { BloodBank, BloodInventory } from "@prisma/client"; // We can keep Prisma types here for internal DB interactions
import { CreateBloodBankType, UpdateBloodBankType, UpdateBloodBankInventoryType } from "../../schemas/bloodbankSchemas";

export class BloodBankService {
    private prisma: typeof db;

    constructor(prisma: typeof db) {
        this.prisma = prisma;
    }

    async getAllBloodBanks(): Promise<(BloodBank & { inventory: BloodInventory[] })[]> {
        console.log("🟢 BloodBank service: getAllBloodBanks started");
        try {
            const bloodBanks = await this.prisma.bloodBank.findMany({
                include: {
                    inventory: true,
                },
            });
            return bloodBanks;
        } catch (error) {
            console.log("🔴 Error in getAllBloodBanks service:", error);
            throw new Error(`Failed to fetch blood banks: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }

    async getBloodBankById(id: string): Promise<BloodBank & { inventory: BloodInventory[] }> {
        console.log("🟢 BloodBank service: getBloodBankById started");
        try {
            const bloodBank = await this.prisma.bloodBank.findUnique({
                where: { id },
                include: {
                    inventory: true,
                },
            });
            if (!bloodBank) {
                throw new Error("Blood bank not found");
            }
            return bloodBank;
        } catch (error) {
            console.log("🔴 Error in getBloodBankById service:", error);
            throw new Error(`Failed to fetch blood bank: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }

    async createBloodBank(bloodBankData: CreateBloodBankType): Promise<BloodBank> {
        console.log("🟢 BloodBank service: createBloodBank started");
        try {
            const bloodBank = await this.prisma.bloodBank.create({
                data: bloodBankData,
            });
            return bloodBank;
        } catch (error) {
            console.log("🔴 Error in createBloodBank service:", error);
            throw new Error(`Failed to create blood bank: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }

    async updateBloodBank(id: string, bloodBankData: UpdateBloodBankType): Promise<BloodBank> {
        console.log("🟢 BloodBank service: updateBloodBank started");
        try {
            const updatedBloodBank = await this.prisma.bloodBank.update({
                where: { id },
                data: bloodBankData,
            });
            return updatedBloodBank;
        } catch (error) {
            console.log("🔴 Error in updateBloodBank service:", error);
            throw new Error(`Failed to update blood bank: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }

    async deleteBloodBank(id: string): Promise<{ message: string }> {
        console.log("🟢 BloodBank service: deleteBloodBank started");
        try {
            await this.prisma.bloodBank.delete({
                where: { id },
            });
            return { message: "Blood bank deleted successfully" };
        } catch (error) {
            console.log("🔴 Error in deleteBloodBank service:", error);
            throw new Error(`Failed to delete blood bank: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }

    async updateBloodBankInventory(id: string, inventoryData: UpdateBloodBankInventoryType): Promise<BloodBank & { inventory: BloodInventory[] }> {
        console.log("🟢 BloodBank service: updateBloodBankInventory started");
        try {
            // First, clear the existing inventory for the blood bank
            await this.prisma.bloodInventory.deleteMany({
                where: {
                    BloodBank: {
                        some: {
                            id: id,
                        }
                    }
                },
            });

            // Then, create new inventory entries and connect them to the blood bank
            const updatedBloodBank = await this.prisma.bloodBank.update({
                where: { id },
                data: {
                    inventory: {
                        create: inventoryData.inventory.map(item => ({
                            bloodGroup: item.bloodGroup,
                            units: item.units,
                        })),
                    },
                },
                include: {
                    inventory: true,
                },
            });
            return updatedBloodBank;
        } catch (error) {
            console.log("🔴 Error in updateBloodBankInventory service:", error);
            throw new Error(`Failed to update blood bank inventory: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }
} 
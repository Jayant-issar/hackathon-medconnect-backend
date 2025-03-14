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
            //check if the blood bank exists
            const bloodbank = await this.prisma.bloodBank.findUnique({
                where:{id},
                include:{
                    inventory:true
                }
            })
            if(!bloodbank){
                throw Error(`No blood bank exists the given ID ${id} `,{
                    cause:"Such id provided that does not exists in the data base"
                })
            }
            
            const updatedBloodBank = this.prisma.bloodBank.update({
                where:{id},
                data:{
                    inventory:{
                        updateMany:inventoryData.inventory.map((item)=>{
                            return{
                                where:{bloodGroup:item.bloodGroup},
                                data:{units:item.units}
                            }
                        })
                    }
                },
                include:{
                    inventory:true
                }
            })
            
            return updatedBloodBank
        } catch (error) {
            console.log("🔴 Error in updateBloodBankInventory service:", error);
            throw new Error(`Failed to update blood bank inventory: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }
} 
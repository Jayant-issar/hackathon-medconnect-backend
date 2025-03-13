import { db } from "../../lib/db";
import { Hospital, BedInformation } from "@prisma/client";
import { UpdateBedAvailabilityType } from "../../schemas/hospitalSchemas";

export class HospitalService {
  private prisma: typeof db;

  constructor(prisma: typeof db) {
    this.prisma = prisma;
  }

  async getAllHospitals(): Promise<(Hospital & { beds: BedInformation[] })[]> {
    console.log("🟢 Hospital service: getAllHospitals started");
    try {
      const hospitals = await this.prisma.hospital.findMany({
        include: {
          beds: true
        }
      });
      
      return hospitals;
    } catch (error) {
      console.log("🔴 Error in getAllHospitals service:", error);
      throw new Error(`Failed to fetch hospitals: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async getHospitalById(id: string): Promise<Hospital & { beds: BedInformation[] }> {
    console.log("🟢 Hospital service: getHospitalById started");
    try {
      const hospital = await this.prisma.hospital.findUnique({
        where: { id },
        include: {
          beds: true
        }
      });
      
      if (!hospital) {
        throw new Error("Hospital not found");
      }
      
      return hospital;
    } catch (error) {
      console.log("🔴 Error in getHospitalById service:", error);
      throw new Error(`Failed to fetch hospital: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async updateBedAvailability(
    hospitalId: string,
    bedId: string,
    updateData: UpdateBedAvailabilityType
  ): Promise<BedInformation> {
    console.log("🟢 Hospital service: updateBedAvailability started");
    try {
      // First verify the hospital exists and owns this bed
      const hospital = await this.prisma.hospital.findUnique({
        where: { id: hospitalId },
        include: { beds: true }
      });
      
      if (!hospital) {
        throw new Error("Hospital not found");
      }
      
      const bedBelongsToHospital = hospital.beds.some(bed => bed.id === bedId);
      if (!bedBelongsToHospital) {
        throw new Error("Bed does not belong to this hospital");
      }
      
      // Update the bed availability
      const updatedBed = await this.prisma.bedInformation.update({
        where: { id: bedId },
        data: { available: updateData.available }
      });
      
      return updatedBed;
    } catch (error) {
      console.log("🔴 Error in updateBedAvailability service:", error);
      throw new Error(`Failed to update bed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
} 
import { Context } from "hono";
import { BloodBankService } from "./bloodbankService";
import { CreateBloodBankType, UpdateBloodBankType, UpdateBloodBankInventoryType } from "../../schemas/bloodbankSchemas";

export class BloodBankController {
  constructor(private bloodBankService: BloodBankService) {}

  async getAllBloodBanks(c: Context) {
    try {
      const bloodBanks = await this.bloodBankService.getAllBloodBanks();
      return c.json({
        success: true,
        data: bloodBanks,
      });
    } catch (error) {
      console.error("Error in getAllBloodBanks controller:", error);
      return c.json(
        { success: false, message: error instanceof Error ? error.message : "Server error" },
        500
      );
    }
  }

  async getBloodBankById(c: Context) {
    try {
      const bloodBankId = c.req.param("id");
      const bloodBank = await this.bloodBankService.getBloodBankById(bloodBankId);
      return c.json({
        success: true,
        data: bloodBank,
      });
    } catch (error) {
      console.error("Error in getBloodBankById controller:", error);
      return c.json(
        { success: false, message: error instanceof Error ? error.message : "Server error" },
        error instanceof Error && error.message === "Blood bank not found" ? 404 : 500
      );
    }
  }

  async createBloodBank(c: Context) {
    try {
      // Data is already validated by middleware and available in c.get('validated')
      const validatedData = c.get('validated') as CreateBloodBankType;
      
      
      const createdBloodBank = await this.bloodBankService.createBloodBank(validatedData);
      return c.json({
        success: true,
        data: createdBloodBank,
        message: "Blood bank created successfully",
      }, 201);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in createBloodBank controller:", error);
        return c.json(
          { success: false, message: "Server error", error: error.message }, // Simplified error response
          500
        );
      }
      console.error("Server Error in createBloodBank controller:", error);
      return c.json(
        { success: false, message: "Server error" },
        500
      );
    }
  }

  async updateBloodBank(c: Context) {
    try {
      const bloodBankId = c.req.param("id");
      // Data is already validated by middleware and available in c.get('validated')
      const validatedData = c.get('validated') as UpdateBloodBankType;
      const updatedBloodBank = await this.bloodBankService.updateBloodBank(bloodBankId, validatedData);
      return c.json({
        success: true,
        data: updatedBloodBank,
        message: "Blood bank updated successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in updateBloodBank controller:", error);
        return c.json(
          { success: false, message: "Server error", error: error.message }, // Simplified error response
          500
        );
      }
      console.error("Server Error in updateBloodBank controller:", error);
      return c.json(
        { success: false, message: "Server error" },
        500
      );
    }
  }

  async deleteBloodBank(c: Context) {
    try {
      const bloodBankId = c.req.param("id");
      const result = await this.bloodBankService.deleteBloodBank(bloodBankId);
      return c.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      console.error("Error in deleteBloodBank controller:", error);
      return c.json(
        { success: false, message: error instanceof Error ? error.message : "Server error" },
        500
      );
    }
  }

  async updateBloodBankInventory(c: Context) {
    try {
      const bloodBankId = c.req.param("id");
      // Data is already validated by middleware and available in c.get('validated')
      const validatedData = c.get('validated') as UpdateBloodBankInventoryType;
      const updatedBloodBank = await this.bloodBankService.updateBloodBankInventory(bloodBankId, validatedData);
      return c.json({
        success: true,
        data: updatedBloodBank,
        message: "Blood bank inventory updated successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in updateBloodBankInventory controller:", error);
        return c.json(
          { success: false, message: "Server error", error: error.message }, // Simplified error response
          500
        );
      }
      console.error("Server Error in updateBloodBankInventory controller:", error);
      return c.json(
        { success: false, message: "Server error" },
        500
      );
    }
  }
} 
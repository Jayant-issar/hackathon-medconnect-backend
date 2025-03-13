import { Context } from "hono";
import { UserService } from "./userService";
import { onboardUserSchema, updateUserProfileSchema } from "../../schemas/userSchemas"; // Import schemas

export class UserController {
  constructor(private userService: UserService) {}

  async onboardUser(c: Context) {
    try {
      const rawData = await c.req.json();
      const validatedData = onboardUserSchema.parse(rawData); // Validate request body

      const { user, isNewUser } = await this.userService.findOrCreateUser(validatedData);
      
      return c.json({
        success: true,
        data: { user, isNewUser },
        message: isNewUser ? "User created successfully" : "User already exists"
      }, isNewUser ? 201 : 200);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Validation Error in onboardUser controller:", error);
        return c.json(
          { success: false, message: "Validation error", errors: error }, // Return validation errors
          400
        );
      }
      console.error("Server Error in onboardUser controller:", error);
      return c.json(
        { success: false, message: "Server error" },
        500
      );
    }
  }

  async getUserProfile(c: Context) {
    try {
      const userId = c.req.param("id");
      const user = await this.userService.getUserById(userId);
      
      return c.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error("Error in getUserProfile controller:", error);
      return c.json(
        { success: false, message: error instanceof Error ? error.message : "Server error" },
        error instanceof Error && error.message === "User not found" ? 404 : 500
      );
    }
  }

  async updateProfile(c: Context) {
    try {
      const rawData = await c.req.json();
      const validatedData = updateUserProfileSchema.parse(rawData); // Validate request body

      const updatedUser = await this.userService.updateUserProfile(c.req.param("id"), validatedData);
      
      return c.json({
        success: true,
        data: updatedUser,
        message: "Profile updated successfully"
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Validation Error in updateProfile controller:", error);
        return c.json(
          { success: false, message: "Validation error", errors: error }, // Return validation errors
          400
        );
      }
      console.error("Server Error in updateProfile controller:", error);
      return c.json(
        { success: false, message: "Server error" },
        500
      );
    }
  }
} 
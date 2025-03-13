import { db } from "../../lib/db";
import { User } from "@prisma/client";
import { OnboardUserType, UpdateUserProfileType } from "../../schemas/userSchemas";

export class UserService {
  private prisma: typeof db;

  constructor(prisma: typeof db) {
    this.prisma = prisma;
  }

  async findOrCreateUser(userData: OnboardUserType): Promise<{ user: User; isNewUser: boolean }> {
    console.log("🟢 User service: findOrCreateUser started");
    try {
      // Check if user exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        return { user: existingUser, isNewUser: false };
      }

      // Create new user if doesn't exist
      const newUser = await this.prisma.user.create({
        data: {
          email: userData.email,
          name: userData.name || "Anonymous User",
          role: userData.role as any || "USER",
        },
      });

      return { user: newUser, isNewUser: true };
    } catch (error) {
      console.log("🔴 Error in findOrCreateUser service:", error);
      throw new Error(`Failed to process user: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async getUserById(userId: string): Promise<User> {
    console.log("🟢 User service: getUserById started");
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      console.log("🔴 Error in getUserById service:", error);
      throw new Error(`Failed to get user: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async updateUserProfile(userId: string, userData: UpdateUserProfileType): Promise<User> {
    console.log("🟢 User service: updateUserProfile started");
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: userData,
      });

      return updatedUser;
    } catch (error) {
      console.log("🔴 Error in updateUserProfile service:", error);
      throw new Error(`Failed to update user: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
} 
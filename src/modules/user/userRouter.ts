import { Hono } from "hono";
import { UserService } from "./userService";
import { UserController } from "./userController";
import { db } from "../../lib/db";
import { validateRequest } from "../../middleware/validateRequest";
import { onboardUserSchema, updateUserProfileSchema } from "../../schemas/userSchemas";

// Initialize services and controllers
const userService = new UserService(db);
const userController = new UserController(userService);

// Create router
export const userRouter = new Hono();

// Routes
userRouter.post("/onboard", validateRequest(onboardUserSchema), (c) => userController.onboardUser(c));
userRouter.get("/:id", (c) => userController.getUserProfile(c));
userRouter.put("/:id", validateRequest(updateUserProfileSchema), (c) => userController.updateProfile(c));

// Base route
userRouter.get("/", (c) => {
  return c.json({
    message: "User API is running",
  });
}); 
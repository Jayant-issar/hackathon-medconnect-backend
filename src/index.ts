import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./modules/user/userRouter";
import { hospitalRouter } from "./modules/hospital/hospitalRouter";
import { bloodBankRouter } from "./modules/bloodbank/bloodbankRouter";

const app = new Hono();

// Middleware
app.use(cors());

// Routes
app.route("/api/users", userRouter);
app.route("/api/hospitals", hospitalRouter);
app.route("/api/bloodbanks", bloodBankRouter);

// Health check route
app.get("/", (c) => {
  return c.json({
    status: "success",
    message: "MedConnect API is running",
    version: "1.0.0"
  });
});

export default app;
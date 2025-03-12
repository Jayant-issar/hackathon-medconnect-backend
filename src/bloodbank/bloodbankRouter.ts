
import { Hono } from "hono";
import { getAllBloodbankInfo } from "./getAllBloodbankInfo";

export const bloodBankRouterApp = new Hono();


bloodBankRouterApp.route("/all", getAllBloodbankInfo)
bloodBankRouterApp.get("/", async (c) => {
    return c.json({
        message: "You have reached the bloodbank router",
    });
});


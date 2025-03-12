
import { Hono } from "hono";
import { getAllBloodbankInfo } from "../bloodbank/getAllBloodbankInfo";
import { getAllHospitalInfo } from "./getAllHositalInfo";

export const hospitalRouterApp = new Hono();



hospitalRouterApp.route("/all", getAllHospitalInfo)

hospitalRouterApp.get("/", async (c) => {
    return c.json({
        message: "You have reached the hospital router",
    });
});
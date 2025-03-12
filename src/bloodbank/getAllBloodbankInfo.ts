import { Hono } from "hono";
import { db } from "../lib/db";

export const getAllBloodbankInfo = new Hono();


getAllBloodbankInfo.get("/", async (c) => {
    

    try {
        const allBloodBanks =  await db.bloodBank.findMany({
            include:{
                inventory:true
            }
        })
    
        if(!allBloodBanks){
            return c.json({
                message: "No blood banks found",
            }, 404);
        }

        return c.json({
            success: true,
            data: allBloodBanks
        },200);
    } catch (error) {
        console.log(error);
        return c.json({
            success: false,
            message: "Internal Server Error",
        },500)
        
    }
    

});
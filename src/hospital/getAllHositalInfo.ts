import { Hono } from "hono";
import { db } from "../lib/db";

export const getAllHospitalInfo = new Hono();


getAllHospitalInfo.get("/", async (c) => {
    

    try {
        const allHospitals =  await db.hospital.findMany({
            include:{
                beds:true

            }
        })
    
        if(!allHospitals){
            return c.json({
                message: "No blood banks found",
            }, 404);
        }

        return c.json({
            success: true,
            data: allHospitals
        },200);
    } catch (error) {
        console.log(error);
        return c.json({
            success: false,
            message: "Internal Server Error",
        },500)
        
    }
    

});

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const db = new PrismaClient({
    datasources:{
        db:{
            url:"PUT YOUR ACCELERATE DATABASE URL HERE"
        }
    }
}).$extends(withAccelerate())
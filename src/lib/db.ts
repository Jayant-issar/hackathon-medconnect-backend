
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const db = new PrismaClient({
    datasources:{
        db:{
            url:"prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiYjY1ZGRhYzMtNTAwNS00N2ZmLWFkM2QtY2YyZTQwMDdiNGQ1IiwidGVuYW50X2lkIjoiMGQ4ZThkYzNmZTZkODc0YTNhMzc2ZDJlNWY0YzAyMzZmNTE2NzM2MTY2ZGEwZjJmZjIzNTY3NGVlODJjYTI5NyIsImludGVybmFsX3NlY3JldCI6IjkwYmRhN2JmLWNjOWUtNDk4NS1hOTI4LWU3MjY0NTU4NzZmYSJ9.ma-pCSQlBYuF48MGgOy3gg-b3l6dKqcm6a59CCzMGOA"
        }
    }
}).$extends(withAccelerate())
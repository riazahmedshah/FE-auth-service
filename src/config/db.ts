import { PrismaClient } from "@prisma/client";

import { hashSync } from "bcrypt"

export const prisma = new PrismaClient().$extends({
    query:{
        user:{
            async $allOperations({args,operation,query}){
                if(operation == "create" && args.data.password){
                    args.data.password =  hashSync(args.data.password, 10)
                }
                return query;
            }
        }
    }
});
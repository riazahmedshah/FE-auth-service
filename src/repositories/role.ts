import { prisma } from "../config/db";

export const hasRole = async (userId:number, role:string) => {
    try {
        const userRole = await prisma.user.findUnique({
            where:{
                id:userId,
            },
            include:{
                user_role:{
                    include:{
                        role:true,
                    }
                }
            }
        });

        return userRole?.user_role.some((ur) => ur.role.name == role) ?? false;
    } catch (error) {
        console.error("hasRole:ERROR");
        throw new Error("ERROR_HAS_ROLE");
    }
}
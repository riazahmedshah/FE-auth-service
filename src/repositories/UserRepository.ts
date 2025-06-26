import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "../config/db";
import { UserProps } from "../types/UseTypes";
import { AppError } from "../utils/CustomHttpError";

export class UserRepository{
    static async createUser(data:UserProps){
        try {
            return await prisma.user.create({
                data:{
                    ...data,
                    user_role:{
                        create:{
                            role:{
                                connect:{name:"USER"}
                            }
                        }
                    }
                },
                include:{
                    user_role:true
                }
            });
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code == "P2002"){
                    throw AppError.Conflict("Email already exists",{
                        field:"email",
                        prismaError:error.meta
                    });
                };
            };
            throw error;
        }
    }

    static async findUserByEmail(email:string){
        try {
            return await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive',
                },
            }
        })
        } catch (error) {
            if(error instanceof AppError.NotFound){
                throw error
            }
            throw error
        }
    }
    
    static async assignRole(userId:number, roleName:string){
        try {
            const role = await prisma.role.findUnique({
                where:{
                    name:roleName
                }
            });
            if(!role){
                throw AppError.NotFound(`Role '${roleName}' not found`);
            }
            const assign = await prisma.user_Role.upsert({
                where: {
                    roleId_userId: {
                        roleId: role.id,
                        userId
                    }
                },
                update: {},
                create: {userId, roleId:role.id},
            });
            return assign;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw AppError.NotFound('User or role does not exist', { 
                        prismaError: error.meta 
                    });
                }
                if (error.code === 'P2002') {
                    throw AppError.Conflict('Role already assigned to user', { 
                        prismaError: error.meta 
                    });
                }
            }
            if (error instanceof AppError.NotFound) throw error;
            throw error;
        }
    }

    static async removeRole(userId:number, roleName:string){
        try {
            const role = await prisma.role.findUnique({
                where:{
                    name:roleName
                }
            });

            if(!role){
                throw new Error("Role not found");
            }

            return await prisma.user_Role.delete({
                where:{
                    roleId_userId:{roleId:role.id,userId}
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    static async updateUser(id:number, data:UserProps){
        try {
            return await prisma.user.update({
                where:{
                    id
                },
                data:{
                    username:data.username
                }
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw AppError.NotFound('User not found', { 
                        prismaError: error.meta 
                    });
                }
                if (error.code === 'P2002') {
                    throw AppError.Conflict('Username already exists', { 
                        field: 'username',
                        prismaError: error.meta 
                    });
                }
            }
            throw error;
        }
    }
}
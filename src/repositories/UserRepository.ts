import { prisma } from "../config/db";
import { UserProps } from "../types/UseTypes";

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
            throw new Error("from repository: ERROR_CREATE_USER")
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
            throw new Error("from repository: ERROR_FIND_USER")
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
                throw new Error("Role not found")
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
            console.error(error);
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
            throw new Error("from repository: ERROR_UPDATE_USER")
        }
    }
}
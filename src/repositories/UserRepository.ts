import { prisma } from "../config/db";
import { UserProps } from "../types/UseTypes";

export class UserRepository{
    static async createUser(data:UserProps){
        try {
            return await prisma.user.create({
                data:{
                    username:data.username,
                    email:data.email,
                    password:data.password
                }
            });
        } catch (error) {
            throw new Error("from repository: ERROR_CREATE_USER")
        }
    }

    static async findUserByEmail(email:string){
        try {
            return await prisma.user.findFirst({
                where:{
                    email
                }
            })
        } catch (error) {
            throw new Error("from repository: ERROR_FIND_USER")
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
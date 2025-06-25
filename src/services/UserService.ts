import { UserRepository } from "../repositories/UserRepository";
import { UserProps } from "../types/UseTypes";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class UserService{
    static async createUser(data:UserProps){
        try {
            return await UserRepository.createUser(data);
        } catch (error) {
            throw new Error("from service: ERROR_CREATE_USER")
        }
    }

    static async signIn(email:string, password:string){
        try {
            const isUserExist = await UserRepository.findUserByEmail(email);
            if(!isUserExist){
                throw new Error("User does not exists with this credentials")
            }
            const isPasswordMatch = await bcrypt.compare(isUserExist.password, password)
            if(!isPasswordMatch){
                throw new Error("Incorrect Pssword");
            }

            const token = jwt.sign(isUserExist, "secret")
            return token
        } catch (error) {
            throw new Error("from service: ERROR_SIGNIN_USER")
        }
    }

    static async updateUser(id:number, data:UserProps){
        try {
            return await UserRepository.updateUser(id, data);
        } catch (error) {
            throw new Error("from service: ERROR_UPDATE_USER")
        }
    }
}
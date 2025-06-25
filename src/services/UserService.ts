import { UserRepository } from "../repositories/UserRepository";
import { JwtPayload } from "../types/jwtTypes";
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
            const isPasswordMatch = await bcrypt.compare(password,isUserExist.password)
            if(!isPasswordMatch){
                throw new Error("Incorrect Pssword");
            }

            const payload = {
                id:isUserExist.id,
                email:isUserExist.email
            }

            const token = jwt.sign(payload, "secret")
            return token
        } catch (error) {
            throw new Error("from service: ERROR_SIGNIN_USER")
        }
    }

    static async isAuthenticated(token:string): Promise<JwtPayload>{
        if(!token){
            throw new Error("Authorization token is required")
        }
        try {
            const decoded = jwt.verify(token,"secret") as JwtPayload
            return decoded;
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new Error("Invalid token");
            }
            console.error("Authentication error:", error);
            throw new Error("Authentication failed");
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
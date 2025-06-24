import { number } from "zod";
import { UserRepository } from "../repositories/UserRepository";
import { UserProps } from "../types/UseTypes";

export class UserService{
    static async createUser(data:UserProps){
        try {
            return await UserRepository.createUser(data);
        } catch (error) {
            throw new Error("from service: ERROR_CREATE_USER")
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
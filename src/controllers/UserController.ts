import { Request, Response } from "express"
import { UserService } from "../services/UserService"
import { emailBaseSchema, signInSchema, signUpSchema } from "../schemas/authSchema"
import { ResponseHandler } from "../utils/ResponseHandler"
import { UserRepository } from "../repositories/UserRepository"
import { AppError } from "../utils/CustomHttpError"
import { handleError } from "../utils/ErrorFunction"

export const createUser = async (req:Request, res:Response) => {
    const body = req.body
    const {success, data, error} = await signUpSchema.safeParseAsync(body);
    if(!success){
        return ResponseHandler.zodError(res, error.errors)
    }
    try {
        const user = await UserService.createUser(data);
        return ResponseHandler.created(res, user);
    } catch (error) {
        return handleError(res, error);
    }
}

export const signIn = async (req:Request, res:Response) => {
    const body = req.body
    const {data, error, success} = signInSchema.safeParse(body);
    if(!success){
        return ResponseHandler.zodError(res, error.errors);
    }
    try {
        const token = await UserService.signIn(data.email, data.password);
        return ResponseHandler.json(res, {token})
    } catch (error) {
        return handleError(res, error);
    }
}

export const assignRole = async (req:Request, res:Response) => {
    const userId = Number(req.params.userId)
    const roleName = req.body;
    try {
        const newRole = await UserService.assignRole(userId, roleName);
        return ResponseHandler.created(res,{newRole});
    } catch (error) {
        return handleError(res, error);
    }

}

export const getUser = async (req:Request, res:Response) => {
    const email = req.body.email
    const {success,data, error} = emailBaseSchema.safeParse(email)
    if(!success){
        return ResponseHandler.zodError(res, error.errors)
    }
    try {
        const user = UserRepository.findUserByEmail(data);
        return ResponseHandler.json(res, user);
    } catch (error) {
        return handleError(res, error);
    }
}
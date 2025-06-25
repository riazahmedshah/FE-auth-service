import { Request, Response } from "express"
import { UserService } from "../services/UserService"
import { emailBaseSchema, signInSchema, signUpSchema } from "../schemas/authSchema"
import { ResponseHandler } from "../utils/ResponseHandler"
import { UserRepository } from "../repositories/UserRepository"

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
        return ResponseHandler.json(res,{
            success:false,
            message:"ERROR_IN_CREATING_USER"
        })
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
        console.error(error)
        return ResponseHandler.json(res,{
            success:false,
            message:"ERROR_IN_SIGNIN",
            error:error
        },500)
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
        return ResponseHandler.json(res,{
            success:false,
            message:"ERROR_IN_GETTING_USER"
        })
    }
}
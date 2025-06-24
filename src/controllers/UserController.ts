import { Request, Response } from "express"
import { UserService } from "../services/UserService"
import { signUpSchema } from "../schemas/authSchema"
import { ResponseHandler } from "../utils/ResponseHandler"

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
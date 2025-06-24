import { z } from "zod"
import { UserRepository } from "../repositories/UserRepository";

export const emailBaseSchema = z.string({
    invalid_type_error:"EMAIL_IS_INVALID",
    required_error:"EMAIL_IS_rEQUIRED"
}).email("EMAIL_IS_INVALID");



const checkUserExist = async (email:string) => {
    try {
        const user = await UserRepository.findUserByEmail(email)
        return !user
    } catch (error) {
        return false
    }
}

const emailSchema = emailBaseSchema.refine(checkUserExist,"EMAIL_ALREADY_EXISTS")


export const signUpSchema = z.object({
    username:z.string().min(3,"USERNAME IS REQUIRED").max(10, "USERNAME_TOO_LONG"),
    email:emailSchema,
    password:z.string({
        required_error:"PASSWORD_IS_REUIRED"
    }).length(6,"Must be exactly 6 characters long")
    
})
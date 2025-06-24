import { z } from "zod"
import { UserRepository } from "../repositories/UserRepository";

const emailSchema = z.string({
    invalid_type_error:"EMAIL_IS_INVALID",
    required_error:"EMAIL_IS_rEQUIRED"
}).email("EMAIL_IS_INVALID");

export const signUpSchema = z.object({
    username:z.string().min(3,"USERNAME IS REQUIRED").max(10, "USERNAME_TOO_LONG"),
    email:emailSchema.refine(async (email) => {
        const doesUserExist = await UserRepository.findUserByEmail(email);
        return !doesUserExist
    }, "EMAIL_ALREADY_EXISTS"),
    password:z.string({
        required_error:"PASSWORD_IS_REUIRED"
    }).length(6,"Must be exactly 6 characters long")
    
})
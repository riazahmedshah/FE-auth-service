import { Response } from "express";
import { AppError } from "./CustomHttpError";
import { ResponseHandler } from "./ResponseHandler";

export const handleError = (res:Response, error:unknown) => {
    if(error instanceof AppError){
        ResponseHandler.json(res,{
            error: error.message,
            details: error.details
        }, error.statusCode)
    };

    ResponseHandler.json(res,{
        message:"INTERNAL_SERVER_ERROR"
    },500)
}
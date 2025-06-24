import { Response } from "express";
import { ZodIssue } from "zod";

export class ResponseHandler{
    static json(res:Response, data?:Record<string, any>, status=200){
        if(data){
            res.status(status).json({data})
        } else{
            res.status(status)
        }
    }

    static created(res:Response,data:Record<string, any>){
        ResponseHandler.json(res, data, 201)
    }

    static zodError(res:Response, issue:ZodIssue[]){
        const errors = issue.reduce((acc:Record<string, string>, issue) => {
            const key = issue.path.join(".");

            acc[key] = issue.message

            return acc
        }, {})

        res.status(400).json({errors});
    }
}
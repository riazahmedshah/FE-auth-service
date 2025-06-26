// import { NextFunction, Request, Response } from "express";
// import { HttpError } from "../utils/CustomHttpError";
// import { ResponseHandler } from "../utils/ResponseHandler";


// export function errorHandler(
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   if (err instanceof HttpError) {
//     return ResponseHandler.json(res,{
//       error: {
//         message: err.message,
//         details: err.details,
//         statusCode: err.statusCode
//       }
    
//     },err.statusCode)
//   }

//   console.error('Unexpected error:', err);
//   return ResponseHandler.json(res, {
//     error: {
//       message: 'Internal server error',
//       statusCode: 500
//     }
//   },500)
// }
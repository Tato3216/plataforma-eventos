import type {
    Request,
    Response,
    NextFunction,
} from "express";

import { ZodError } from "zod";
import {AppError} from "../erros/app.error.js";

export function errorHandler(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {

    if (error instanceof ZodError) {
        res.status(400).json({
            message: "Invalid request data",
            errors: error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });

        return;
    }


    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            message: error.message,
        });

        return;
    }
    
    console.error(error);

    res.status(500).json({
        message: "Internal server error",
    });
}
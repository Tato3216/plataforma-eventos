import type { Request, Response, NextFunction, } from "express";

import confirmacionService from "../services/confirmacion.service.js";
import type { CreateConfirmacionDto } from "../dtos/confirmacion.dto.js";

class ConfirmacionController {
    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data = req.body as CreateConfirmacionDto;

            const confirmation =
                await confirmacionService.create(data);

            res.status(201).json(confirmation);
        } catch (error) {
            next(error);
        }
    }
}

export default new ConfirmacionController();
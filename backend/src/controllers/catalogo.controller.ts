import type { Request, Response, NextFunction } from "express";
import catalogService from "../services/catalogo.service.js";

class CatalogoController {
    async getServicios(
        _req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const services = await catalogService.getServicios();

            res.status(200).json(services);
        } catch (error) {
            next(error);
        }
    }

    async getProductos(
        _req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const products = await catalogService.getProductos();

            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }
}

export default new CatalogoController();
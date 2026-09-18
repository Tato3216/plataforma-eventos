import { Router } from "express";
import catalogoController from "../controllers/catalogo.controller.js";

const router = Router();

router.get(
    "/servicios",
    catalogoController.getServicios.bind(catalogoController)
);

router.get(
    "/productos",
    catalogoController.getProductos.bind(catalogoController)
);

export default router;
import { Router } from "express";

import confirmacionController from "../controllers/confirmacion.controller.js";
import { createConfirmacionSchema } from "../dtos/confirmacion.dto.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post(
    "/confirmaciones",
    validate(createConfirmacionSchema),
    confirmacionController.create.bind(confirmacionController)
);

export default router;
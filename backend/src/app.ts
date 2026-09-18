import express from "express";
import cors from "cors";
import catalogoRoutes from "./routes/catalogo.routes.js";
import confirmacionRoutes from "./routes/confirmacion.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";


const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());


app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Server is running",
    });
});

app.use("/api", catalogoRoutes);
app.use("/api", confirmacionRoutes);

app.use(errorHandler);

export default app;
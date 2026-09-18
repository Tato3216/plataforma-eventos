import prisma from "../config/prisma.js";

class CatalogoRepository {
    async getServicios() {
        return prisma.service.findMany({
            where: {
                active: true,
            },
            orderBy: {
                id: "asc",
            },
        });
    }

    async getProductos() {
        return prisma.product.findMany({
            where: {
                active: true,
            },
            orderBy: {
                id: "asc",
            },
        });
    }
}

export default new CatalogoRepository();
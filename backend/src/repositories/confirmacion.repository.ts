import prisma from "../config/prisma.js";

class ConfirmacionRepository {
    async findServicesById(ids: number[]) {
        if(ids.length === 0){
            return [];
        }

        return prisma.service.findMany({
            where: {
                id: {
                    in: ids,
                },
                active: true,
            },
        });
    }

    async findProductsById(ids: number[]) {
        if(ids.length === 0){
            return [];
        }

        return prisma.product.findMany({
            where: {
                id: {
                    in: ids,
                },
                active: true,
            },
        });
    }

    async createConfirmacion(
        customer: {
            name: string;
            lastName: string;
            email: string;
        },
        attends:boolean,
        attendanceAt: Date | null,
        serviceIds: number[],
        productIds: number[],
    ) {
        return prisma.$transaction(async (tx) => {
            const savedCustomer = await tx.customer.upsert({
                where: {
                    email: customer.email,
                },
                update: {
                    name: customer.name,
                    lastName: customer.lastName,
                },
                create: {
                    name: customer.name,
                    lastName: customer.lastName,
                    email: customer.email,
                },
            });

            const confirmation = await tx.confirmation.create({
                data: {
                    customerId: savedCustomer.id,
                    attends,
                    attendanceAt,

                    services: {
                        create: serviceIds.map((serviceId) => ({
                            serviceId,
                        })),
                    },

                    products: {
                        create: productIds.map((productId) => ({
                            productId,
                        })),
                    },
                },

                include: {
                    customer: true,

                    services: {
                        include: {
                            service: true,
                        },
                    },

                    products: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            return confirmation;
        });
    }
}

export default new ConfirmacionRepository();
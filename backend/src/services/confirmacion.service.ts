import { Prisma } from "../generated/prisma/client.js";

import type {CreateConfirmacionDto} from "../dtos/confirmacion.dto.js";
import {AppError} from "../erros/app.error.js";
import confirmacionRepository from "../repositories/confirmacion.repository.js";
import {DescuentoService} from "../domain/descuento.service.js";

class ConfirmacionService{
    async create(data: CreateConfirmacionDto){
        if (data.attends && !data.attendanceAt) {
            throw new AppError(
                400,
                "Asistencia y fecha son requeridos cuando el cliente está asistiendo"
            );
        }

        if (!data.attends) {
            if (data.attendanceAt) {
                throw new AppError(
                    400,
                    "Un cliente que no asiste no puede seleccionar una fecha de asistencia"
                );
            }

            if (data.serviceIds.length > 0 || data.productIds.length > 0) {
                throw new AppError(
                    400,
                    "Un cliente que no asiste no puede seleccionar servicios o productos"
                );
            }
        }

        const [servicios, productos] = await Promise.all([
            confirmacionRepository.findServicesById(data.serviceIds),
            confirmacionRepository.findProductsById(data.productIds)
        ]);

        if(servicios.length !== data.serviceIds.length){
            throw new AppError(
                400, "Algunos de los servicios proporcionados no existen o no están activos"
            );
        }

        if(productos.length !== data.productIds.length){
            throw new AppError(
                400, "Algunos de los productos proporcionados no existen o no están activos"
            );
        }

        const serviciosubtotal = servicios.reduce(
            (total, service) => total.plus(service.price),
            new Prisma.Decimal(0)
        );

        const productosubtotal = productos.reduce(
            (total, product) => total.plus(product.price),
            new Prisma.Decimal(0)
        );

        const serviceDiscountPct =
            DescuentoService.getServiceDescuento(
                servicios.length,
                serviciosubtotal.toNumber()
            );

        const productDiscountPct =
            DescuentoService.getProductoDescuento(
                productos.length
            );

        const serviceDiscount = serviciosubtotal
            .mul(serviceDiscountPct)
            .div(100);

        const productDiscount = productosubtotal
            .mul(productDiscountPct)
            .div(100);

        const serviceTotal =
            serviciosubtotal.minus(serviceDiscount);

        const productTotal =
            productosubtotal.minus(productDiscount);

        const confirmation =
            await confirmacionRepository.createConfirmacion(
                data.customer,
                data.attends,
                data.attendanceAt ?? null,
                data.serviceIds,
                data.productIds
            );

        return {
            confirmationId: confirmation.id,

            customer: confirmation.customer,

            attends: confirmation.attends,

            attendanceAt: confirmation.attendanceAt,

            services: confirmation.services.map(
                (item) => item.service
            ),

            products: confirmation.products.map(
                (item) => item.product
            ),

            summary: {
                services: {
                    subtotal: serviciosubtotal,
                    discountPct: serviceDiscountPct,
                    discount: serviceDiscount,
                    total: serviceTotal,
                },

                products: {
                    subtotal: productosubtotal,
                    discountPct: productDiscountPct,
                    discount: productDiscount,
                    total: productTotal,
                },
            },
        };
    }
}

export default new ConfirmacionService();
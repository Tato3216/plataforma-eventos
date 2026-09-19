import {z} from "zod";

const uniqueIds = (ids: number[]) => {
    return new Set(ids).size === ids.length;
};

export const createConfirmacionSchema = z.object({
    customer: z.object({
        name: z
        .string()
        .trim()
        .min(2, "Nombre del cliente debe contener al menos 2 caracteres")
        .max(100, "Nombre del cliente no puede exceder 100 caracteres"),

        lastName: z
            .string()
            .trim()
            .min(2, "Apellido del cliente debe contener al menos 2 caracteres")
            .max(100, "Apellido del cliente no puede exceder 100 caracteres"),

        email: z
        .string()
        .trim()
        .email("Correo electrónico inválido")
    }),

    attends: z.boolean(),

    attendanceAt: z.coerce.date().nullable().optional(),

    serviceIds: z
    .array(z.number().int().positive())
    .default([])
    .refine(uniqueIds, "Los IDs de servicios deben ser únicos"),

    productIds: z
    .array(z.number().int().positive())
    .default([])
    .refine(uniqueIds, "Los IDs de productos deben ser únicos"),
});

export type CreateConfirmacionDto = z.infer<typeof createConfirmacionSchema>;
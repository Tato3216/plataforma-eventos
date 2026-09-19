export interface CrearConfirmacionRequest {
    customer: {
        name: string;
        lastName: string;
        email: string;
    };
    attends: boolean;
    attendanceAt: string | null;
    serviceIds: number[];
    productIds: number[];
}

export interface ResumenDescuento {
    subtotal: string;
    discountPct: number;
    discount: string;
    total: string;
}

export interface ConfirmacionResponse {
    confirmationId: number;

    customer: {
        id: number;
        name: string;
        lastName: string;
        email: string;
    };

    attends: boolean;
    attendanceAt: string | null;

    summary: {
        services: ResumenDescuento;
        products: ResumenDescuento;
    };
}
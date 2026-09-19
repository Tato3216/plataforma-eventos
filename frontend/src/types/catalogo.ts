export interface Servicio {
    id: number;
    name: string;
    description: string | null;
    price: string;
    active: boolean;
}

export interface Producto {
    id: number;
    name: string;
    description: string | null;
    price: string;
    active: boolean;
}
import type { Producto, Servicio } from "../types/catalogo.js";
import type { ConfirmacionResponse, CrearConfirmacionRequest } from "../types/confirmacion.js";

const API_URL = 
    import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function getServices(): Promise<Servicio[]> {
    const response = await fetch(`${API_URL}/servicios`);

    if (!response.ok) {
        throw new Error("Error al obtener los servicios");
    }

    return response.json();
}

export async function getProducts(): Promise<Producto[]> {
    const response = await fetch(`${API_URL}/productos`);

    if(!response.ok){
        throw new Error("Error al obtener los productos");
    }
    
    return response.json();
}

export async function createConfirmation(
    data: CrearConfirmacionRequest
): Promise<ConfirmacionResponse> {
    const response = await fetch(`${API_URL}/confirmaciones`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if(!response.ok){
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.message || "Error al registrar la confirmacion"
        );
    }

    return response.json();
}
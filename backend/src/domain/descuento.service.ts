const CONT_MIN_SERVICIO = 2;
const SUBTOTAL_MIN_SERVICIO = 1500;

const PORCENT_DESC_ESTANDAR = 3;
const PORCENT_DESC_ALTO = 5;

const MIN_CANT_PRODUCTO = 3;
const MAX_CANT_PRODUCTO = 5;


export class DescuentoService {
    static getServiceDescuento(
        contadorServicio: number,
        subtotal: number
    ) : number {
        if(contadorServicio < CONT_MIN_SERVICIO) {
        return 0;
        }

        if(subtotal > SUBTOTAL_MIN_SERVICIO) {
            return PORCENT_DESC_ALTO;
        }

        return PORCENT_DESC_ESTANDAR;
    }

    static getProductoDescuento(
        contadorProducto: number
    ) : number {
        if(contadorProducto >= MAX_CANT_PRODUCTO) {
            return PORCENT_DESC_ALTO;
        }

        if(contadorProducto >= MIN_CANT_PRODUCTO) {
            return PORCENT_DESC_ESTANDAR;
        }

        return 0;
    }
}
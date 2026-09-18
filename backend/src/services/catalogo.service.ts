import catalogoRepository from "../repositories/catalogo.repository.js";

class CatalogoService {
    async getServicios () {
        return catalogoRepository.getServicios();
    }

    async getProductos () {
        return catalogoRepository.getProductos();
    }
}

export default new CatalogoService();
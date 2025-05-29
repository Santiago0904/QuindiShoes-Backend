import CarritoRepository from "../../repositories/ModuloCarritoCompras/CarritoRepository";

class CarritoServices{

static async agregarCarrito(id: number) {
return await CarritoRepository.obtenerItemCarrito(id)

}

}
export default CarritoServices;
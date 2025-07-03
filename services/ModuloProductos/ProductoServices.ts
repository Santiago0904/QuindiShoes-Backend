import ProductoRepository from '../../repositories/ModuloProductos/ProductoRepository';
import Producto from '../../Dto/ProductoDto';

class ProductoServices {

    //Se necesita un disparador para poder agregar producto, cuando la factura se halla hecho exitosamente 

    static async registrarProducto(producto: Producto) {
        return await ProductoRepository.registrarProducto(producto);
    }

    static async obtenerProductos() {
        return await ProductoRepository.obtenerTodos();
    }

    static async eliminarProducto(id: number) {
        await ProductoRepository.eliminarProducto(id);
    }

    static async actualizarProducto(producto: Producto, id: number, ) {
        return await ProductoRepository.ActualizarProducto( producto,id);
    }

    static async actualizarReservaActiva(id_producto: number, activa: boolean) {
        return await ProductoRepository.actualizarReservaActiva(id_producto, activa);
    }

    static async actualizarImagen(id_producto: number, nuevaUrl: string) {
    return await ProductoRepository.actualizarImagen(id_producto, nuevaUrl);
}
}
export default ProductoServices;
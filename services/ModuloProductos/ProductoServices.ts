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

      static async actualizarPersonalizacionActiva(id: number | string, personalizacion_activa: number) {
    // Asegúrate de convertir id a número si es necesario
    return await ProductoRepository.actualizarPersonalizacionActiva(Number(id), personalizacion_activa);
    }
    
}
export default ProductoServices;
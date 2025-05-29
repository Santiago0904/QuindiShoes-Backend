
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
}
export default ProductoServices;
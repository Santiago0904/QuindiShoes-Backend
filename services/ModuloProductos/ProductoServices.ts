import ProductoRepository from '../../repositories/ModuloProductos/ProductoRepository';
import Producto from '../../Dto/ProductoDto';

class ProductoServices {

    //Se necesita un disparador para poder agregar producto, cuando la factura se halla hecho exitosamente 

    static async registrarProducto(producto: Producto) {
        return await ProductoRepository.registrarProducto(producto);
    }

    static async obtenerProductos(soloActivos = true) {
        return await ProductoRepository.obtenerTodos(soloActivos);
    }

    static async eliminarProducto(id: number) {
        const tieneFacturas = await ProductoRepository.productoTieneFacturas(id);
        if (tieneFacturas) {
            throw new Error("No se puede eliminar: el producto está ligado a facturas.");
        }
        await ProductoRepository.eliminarProducto(id);
    }

    static async actualizarProducto(producto: Producto, id: number,) {
        return await ProductoRepository.ActualizarProducto(producto, id);
    }

    static async actualizarReservaActiva(id_producto: number, activa: boolean) {
        return await ProductoRepository.actualizarReservaActiva(id_producto, activa);
    }

    static async actualizarImagen(id_producto: number, nuevaUrl: string) {
        return await ProductoRepository.actualizarImagen(id_producto, nuevaUrl);
    }

    static async actualizarPersonalizacionActiva(id: number | string, personalizacion_activa: number) {
        // Asegúrate de convertir id a número si es necesario
        return await ProductoRepository.actualizarPersonalizacionActiva(Number(id), personalizacion_activa);
    }

    static async obtenerProductosFiltrados(filtros: any) {
        return await ProductoRepository.obtenerTodosFiltrados(filtros);
    }

    static async actualizarEstadoActivo(id_producto: number, activo: boolean) {
        return await ProductoRepository.actualizarEstadoActivo(id_producto, activo);
    }


}
export default ProductoServices;
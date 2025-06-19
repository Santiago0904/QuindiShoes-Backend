import ResenaProductoRepository from '../../repositories/ModuloProductos/ResenaProductoRepository';
import { ResenaProductoDto } from '../../Dto/ResenaProductoDto';

class ResenaProductoService {
  static async agregarResena(resena: ResenaProductoDto) {
    return await ResenaProductoRepository.agregarResena(resena);
  }
  static async obtenerResenasPorProducto(id_producto: number) {
    return await ResenaProductoRepository.obtenerResenasPorProducto(id_producto);
  }
  static async eliminarResena(id_resena: number, id_usuario: number) {
    return await ResenaProductoRepository.eliminarResena(id_resena, id_usuario);
  }
  static async actualizarResena(data: { id_resena: number, id_usuario: number, resena: string, puntuacion: number }) {
    return await ResenaProductoRepository.actualizarResena(data);
  }
}

export default ResenaProductoService;
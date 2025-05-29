import ResenaDto from '../../Dto/resenaDto';
import UsuarioRepository from '../../repositories/ModuloUsuarios/UsuarioRepository';

class ResenaService {
  static async agregarResena(resena: ResenaDto) {
    return await UsuarioRepository.agregarResena(resena);
  }
  static async editarResena(resena: ResenaDto) {
    return await UsuarioRepository.editarResena(resena);
  }
  static async eliminarResena(id_usuario: number) {
    return await UsuarioRepository.eliminarResena(id_usuario);
  }
  static async obtenerTodasLasResenas() {
    return await UsuarioRepository.obtenerTodasLasResenas();
  }
}

export default ResenaService;

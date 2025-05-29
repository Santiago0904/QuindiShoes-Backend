import UsuarioRepository from "../../repositories/ModuloUsuarios/UsuarioRepository"


class JuegoService {
    static async guardarPuntuacion(usuarioId: number, puntuacion: number) {
        console.log("Guardando puntuación:", usuarioId, puntuacion);
        return await UsuarioRepository.guardarPuntuacion(usuarioId, puntuacion);
        console
    }

    static async obtenerTops() {
        return await UsuarioRepository.ObtenerTops();
    }


}

export default JuegoService;
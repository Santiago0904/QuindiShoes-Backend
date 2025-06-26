import PersonalizacionRepository from "../../repositories/ModuloPersonalizacion/PersonalizacionRepository";
import Materiales from "../../Dto/MaterialesDto";
import Colores from "../../Dto/ColoresDto"; 
import ZonaProducto from "../../Dto/ZonaProductosDto";

class PersonalizacionServices {
    static async addMateriales(materiales: Materiales) {
        return await PersonalizacionRepository.addMateriales(materiales);
    }
    
    static async deleteMateriales(id: number) {
        return await PersonalizacionRepository.deleteMateriales(id);
    }

    static async guardarPersonalizacionColoresPorNombre(colores: string[]) {
        console.log("Datos recibidos en guardarPersonalizacionColoresPorNombre:", colores);
        return await PersonalizacionRepository.sumarUsoColoresPorNombre(colores);
    }

    static async actualizarMaterial(material: Materiales, id: number, ) {
        return await PersonalizacionRepository.ActualizarMaterial( id, material);
    }

    static async obtenerMateriales() {
        return await PersonalizacionRepository.obtenerMaterial();
    }

    static async addColores(colores: Colores) {
        return await PersonalizacionRepository.addColores(colores);
    }
    
    static async deleteColores(id: number) {
        return await PersonalizacionRepository.deleteColores(id);
    }

    static async actualizarColor(colores: Colores, id: number, ) {
        return await PersonalizacionRepository.ActualizarColor(id, colores);
    }

    static async obtenerColores() {
        return await PersonalizacionRepository.obtenerColores();
    }

    static async addZonaProducto(zonaProducto: ZonaProducto) {
        return await PersonalizacionRepository.addZonaProducto(zonaProducto);
    }

    static async deleteZonaProducto(id: number) {
        return await PersonalizacionRepository.deleteZonaProducto(id);
    }  
    
    static async actualizarZonaProducto(zonaProducto: ZonaProducto, id: number, ) {
        return await PersonalizacionRepository.ActualizarZonaProducto( id, zonaProducto);
    }

    static async obtenerZonaProducto() {
        return await PersonalizacionRepository.obtenerZonaProducto();
    }
    
    static async guardarModeloGLB(id_usuario: number, modelo: Buffer) {
    return PersonalizacionRepository.guardarModeloGLB(id_usuario, modelo);
    }

      static async obtenerHistorialGLB(id_usuario: number) {
    const result = await PersonalizacionRepository.obtenerModelosPorUsuario(id_usuario);
    console.log("Historial de modelos GLB obtenido:", result);
    return result;
    }

    static async obtenerModeloPorId(id_modelo: number) {
  return await PersonalizacionRepository.obtenerModeloPorId(id_modelo);
    }

}

export default PersonalizacionServices;
import BusquedaRepository from "../../repositories/ModuloProductos/BuquedaRepository";

class BusquedaServices {
  static async buscarProductosConFiltros(filtros: any) {
    return await BusquedaRepository.buscarProductosConFiltros(filtros);
  }

  static async obtenerSugerencias(query: string) {
    return await BusquedaRepository.obtenerSugerencias(query);
  }
}

export default BusquedaServices;

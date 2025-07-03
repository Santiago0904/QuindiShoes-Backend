import FacturaRepository from "../../repositories/ModuloVentas/FacturaRepository";

export default class FacturaService {
  static async obtenerFacturasDomicilio() {
    return await FacturaRepository.obtenerFacturasDomicilio();
  }
}
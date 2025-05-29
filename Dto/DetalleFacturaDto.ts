class DetalleFactura{
    _precioUnitario :number;
    _subtotal :number;
    _cantidad :number;
    _idFactura :number;
    _idProducto :number;

    constructor(idFactura :number, idProducto :number, precioUnitario :number, subtotal :number, cantidad :number) {
        this._idFactura = idFactura;
        this._idProducto = idProducto;
        this._precioUnitario = precioUnitario;
        this._subtotal = subtotal;
        this._cantidad = cantidad;
    }

    get idFactura(): number {
        return this._idFactura;
    }
    get idProducto(): number {
        return this._idProducto;
    }
    get precioUnitario(): number {
        return this._precioUnitario;
    }
    get subtotal(): number {
        return this._subtotal;
    }
    get cantidad(): number {
        return this._cantidad;
    }

    set idFactura(idFactura: number) {
        this._idFactura = idFactura;
    }
    set idProducto(idProducto: number) {
        this._idProducto = idProducto;
    }
    set precioUnitario(precioUnitario: number) {
        this._precioUnitario = precioUnitario;
    }
    set subtotal(subtotal: number) {
        this._subtotal = subtotal;
    }
    set cantidad(cantidad: number) {
        this._cantidad = cantidad;
    }
}
export default DetalleFactura;
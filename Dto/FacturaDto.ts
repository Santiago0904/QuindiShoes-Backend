class Factura{
    private _precio_total: number;
    private _fecha: string;
    private _id_cliente: string;

    constructor(precio_total: number, fecha: string, id_cliente: string) {
        this._precio_total = precio_total;
        this._fecha = fecha;
        this._id_cliente = id_cliente;
    }

    get precio_total(): number {
        return this._precio_total;
    }
    get fecha(): string {
        return this._fecha;
    }
    get id_cliente(): string {
        return this._id_cliente;
    }

    set precio_total(precio_total: number) {
        this._precio_total = precio_total;
    }
    set fecha(fecha: string) {
        this._fecha = fecha;
    }
    set id_cliente(id_cliente: string) {
        this._id_cliente = id_cliente;
    }
}
export default Factura;
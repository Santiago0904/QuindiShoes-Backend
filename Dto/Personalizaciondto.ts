class Personalizaion{
    private _idProducto: string

    constructor(idProducto: string) {
        this._idProducto = idProducto;
    }

    get idProducto(): string {
        return this._idProducto;
    }

    set idProducto(idProducto: string) {
        this._idProducto = idProducto;
    }
}
export default Personalizaion;
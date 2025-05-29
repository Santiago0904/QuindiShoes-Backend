class ZonaProducto{
    _nombre_zona: string;

    constructor(_nombre_zona:string) {
        this._nombre_zona = _nombre_zona;
    }

    get nombre_zona(): string {
        return this._nombre_zona;
    }

    set nombreZona(nombre_zona: string) {
        this._nombre_zona = nombre_zona;
    }
}
export default ZonaProducto;
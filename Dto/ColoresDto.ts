class Colores{
    _nombreColor: string;
    _codigoHax: string;

    constructor(_nombreColor:string, _codigoHax:string) {
        this._nombreColor = _nombreColor;
        this._codigoHax = _codigoHax;
    }

    get nombreColor(): string {
        return this._nombreColor;
    }
    get codigoHax(): string {
        return this._codigoHax;
    }

    set nombreColor(nombreColor: string) {
        this._nombreColor = nombreColor;
    }
    set codigoHax(codigoHax: string) {
        this._codigoHax = codigoHax;
    }
}
export default Colores;
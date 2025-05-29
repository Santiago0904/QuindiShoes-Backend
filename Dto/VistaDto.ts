class Vista{
    private _nombreVista: string;

    constructor(nombreVista: string) {
        this._nombreVista = nombreVista;
    }

    get nombreVista(): string {
        return this._nombreVista;
    }

    set nombreVista(nombreVista: string) {
        this._nombreVista = nombreVista;
    }

}
export default Vista;
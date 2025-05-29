class Producto{
    private _tipoProducto: string;
    private _nombreProducto: string;
    // private _reseñaProducto: string;
    private _generoProducto: string;
    private _stockProducto: number;
    private _tallaProducto: string;
    private _precioProducto: number;
    private _colorProducto: string;
    private _imagenProducto: string

    constructor(
        tipoProducto: string, nombreProducto: string,  generoProducto: string,stockProducto: number, tallaProducto: string, precioProducto: number, colorProducto: string, imagenProducto: string
    ) {
        this._tipoProducto = tipoProducto;
        this._nombreProducto = nombreProducto;
        this._generoProducto = generoProducto;
        this._stockProducto = stockProducto;
        this._tallaProducto = tallaProducto;
        this._precioProducto = precioProducto;
        this._colorProducto = colorProducto;
        this._imagenProducto = imagenProducto
    }
    

    // Getters
    get tipoProducto(): string {
        return this._tipoProducto;
    }
    get nombreProducto(): string {
        return this._nombreProducto;
    }   
    // get reseñaProducto(): string {
    //     return this._reseñaProducto;
    // }   
    get generoProducto(): string {
        return this._generoProducto;
    }
    get stockProducto(): number {
        return this._stockProducto;
    }
    get tallaProducto(): string {
        return this._tallaProducto;
    }
    get precioProducto(): number {
        return this._precioProducto;
    }
    get colorProducto(): string {
        return this._colorProducto;
    }
    get imagenProducto(): string {
        return this._imagenProducto;
    }

    // Setters
    set tipoProducto(tipoProducto: string) {
        this._tipoProducto = tipoProducto;
    }
    set nombreProducto(nombreProducto: string) {
        this._nombreProducto = nombreProducto;
    }
    // set reseñaProducto(reseñaProducto: string) {
    //     this._reseñaProducto = reseñaProducto;
    // }
   
    set generoProducto(generoProducto: string) {
        this._generoProducto = generoProducto;
    }
    set stockProducto(stockProducto: number) {
        this._stockProducto = stockProducto;
    }
    set tallaProducto(tallaProducto: string) {
        this._tallaProducto = tallaProducto;
    }
    set precioProducto(precioProducto: number) {
        this._precioProducto = precioProducto;
    }
    set colorProducto(colorProducto: string) {
        this._colorProducto = colorProducto;
    }
    set imagenProducto(imagenProducto: string) {
        this._imagenProducto = imagenProducto;
    }





}
export default Producto;
   
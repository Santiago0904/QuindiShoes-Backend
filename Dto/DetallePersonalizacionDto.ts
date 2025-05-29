class DetallePersonalizacion{
    _idPersonalizacionCalzado: string;
    _idMaterial: string;
    _idColor: string;
    _idZonaProducto: string;

    constructor(idPersonalizacionCalzado: string, idMaterial: string, idColor: string, idZonaProducto: string) {
        this._idPersonalizacionCalzado = idPersonalizacionCalzado;
        this._idMaterial = idMaterial;
        this._idColor = idColor;
        this._idZonaProducto = idZonaProducto;
    }

    get idPersonalizacionCalzado(): string {
        return this._idPersonalizacionCalzado;
    }
    get idMaterial(): string {
        return this._idMaterial;
    }
    get idColor(): string {
        return this._idColor;
    }
    get idZonaProducto(): string {
        return this._idZonaProducto;
    }

    set idPersonalizacionCalzado(idPersonalizacionCalzado: string) {
        this._idPersonalizacionCalzado = idPersonalizacionCalzado;
    }
    set idMaterial(idMaterial: string) {
        this._idMaterial = idMaterial;
    }
    set idColor(idColor: string) {
        this._idColor = idColor;
    }
    set idZonaProducto(idZonaProducto: string) {
        this._idZonaProducto = idZonaProducto;
    }
}
export default DetallePersonalizacion;
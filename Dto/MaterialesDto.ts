class Materiales{
    private _nombre_material: string;

    constructor(nombre_material: string) {
        this._nombre_material = nombre_material;
    }

    get nombre_material(): string {
        return this._nombre_material;
    }

    set nombre_material(nombre_material: string) {
        this._nombre_material = nombre_material;
    }
}
export default Materiales;
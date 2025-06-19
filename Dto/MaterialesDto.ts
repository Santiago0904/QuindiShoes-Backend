class Materiales{
    private _nombre_material: string;
    private _material_img: Buffer | null;

    constructor(nombre_material: string, material_img: Buffer | null) {
        this._nombre_material = nombre_material;
        this._material_img = material_img;
    }

    get nombre_material(): string {
        return this._nombre_material;
    }

    set nombre_material(nombre_material: string) {
        this._nombre_material = nombre_material;
    }

    get material_img(): Buffer | null {
        return this._material_img;
    }
    
    set material_img(material_img: Buffer | null) {
        this._material_img = material_img;
    }
}
export default Materiales;
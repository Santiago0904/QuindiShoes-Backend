class Usuario {
    private _nombre: string;
    private _apellido: string;
    private _telefono: string;
    private _direccion: string;
    private _correo: string;
    private _contraseña?: string;
    private _record: string;
    private _rol: string

    constructor(
        nombres: string,
        apellidos: string,
        telefono: string,
        direccion: string,
        correo: string,
        rol: string,
        record: string,
        contraseña?: string // ✅ los opcionales van al final
    ) {
        this._nombre = nombres;
        this._apellido = apellidos;
        this._telefono = telefono;
        this._direccion = direccion;
        this._correo = correo;
        this._rol = rol;
        this._record = record;
        this._contraseña = contraseña;
    }

    // Getters
    get nombres(): string {
        return this._nombre;
    }

    get apellidos(): string {
        return this._apellido;
    }

    get telefono(): string {
        return this._telefono;
    }

    get direccion(): string {
        return this._direccion;
    }

    get correo(): string {
        return this._correo;
    }

    get contraseña(): string | undefined {
        return this._contraseña;
    }

    get record(): string {
        return this._record;
    }

    get rol(): string {
        return this._rol;
    }



    // Setters
    set nombres(nombres: string) {
        this._nombre = nombres;
    }
    set apellidos(apellidos: string) {
        this._apellido = apellidos;
    }
    set telefono(telefono: string) {
        this._telefono = telefono;
    }
    set direccion(direccion: string) {
        this._direccion = direccion;
    }
    set correo(correo: string) {
        this._correo = correo;
    }
    set contraseña(contraseña: string | undefined) {
        this._contraseña = contraseña;
    }
    set record(record: string) {
        this._record = record;
    }

    set rol(rol: string) {
        this._rol = rol;
    }







}

export default Usuario;
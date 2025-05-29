class Usuario {
    private _nombres: string;
    private _apellidos: string;
    private _telefono: string;
    private _direccion: string;
    private _correo: string;
    private _contraseña?: string;
    private _record: string;
    private _rol:string

    constructor(
        nombres: string, apellidos: string, telefono: string, direccion: string, correo: string,  rol:string, record: string ,contraseña?: string,
    ) {
        this._nombres = nombres;
        this._apellidos = apellidos;
        this._telefono = telefono;
        this._direccion = direccion;
        this._correo = correo;
        this._contraseña = contraseña;
        this._rol = rol;
        this._record = record;
    }

    // Getters
    get nombres(): string {
        return this._nombres;
    }

    get apellidos(): string {
        return this._apellidos;
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
        this._nombres = nombres;
    }
    set apellidos(apellidos: string) {
        this._apellidos = apellidos;
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
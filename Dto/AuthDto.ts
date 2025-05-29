class Auth {
    private _correo: string;
    private _contraseña: string
    private _rol: string

    constructor(
        correo: string,
        contraseña: string,
        rol: string

    ) {
        this._rol = rol
        this._correo = correo;
        this._contraseña = contraseña
    }
    // Getters
    get correo(): string {
        return this._correo;
    }
    get rol(): string {
        return this._rol;
    }

    get contraseña(): string {
        return this._contraseña;
    }

    // Setters
    set correo(correo: string) {
        this._correo = correo;
    }
    set rol(rol: string) {
        this._rol = rol;
    }

    set contraseña(contraseña: string) {
        this._contraseña = contraseña;
    }

}

export default Auth;
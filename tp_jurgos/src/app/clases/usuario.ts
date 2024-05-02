export class Usuario {

    public nombre: string;
    public contraseña: string;
    public mail: string;
    public code: string;

    constructor(nombre:string ,mail: string, contraseña: string, code: string) {
        this.mail = mail;
        this.contraseña = contraseña;
        this.nombre = nombre;
        this.code = code;
    }

    
    
}

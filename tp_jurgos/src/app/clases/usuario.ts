export class Usuario {

    public nombre: string;
    public contraseña: string;
    public mail: string;
    public code: string;
    public lastLogin: Date | null = null;

    constructor(nombre: string, mail: string, contraseña: string, code: string, lastLogin: Date | null = null) {
        this.mail = mail;
        this.contraseña = contraseña;
        this.nombre = nombre;
        this.code = code;
        this.lastLogin = lastLogin;
      }
 
}

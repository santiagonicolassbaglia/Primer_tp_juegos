export class Usuario {

    public nombre: string;
    public clave: string;
    public email: string;

    constructor(nombre:string ,email: string, clave: string) {
        this.email = email;
        this.clave = clave;
        this.nombre = nombre;
    }

    
    
}

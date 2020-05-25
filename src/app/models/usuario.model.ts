// Exportamos porque necesitamos usarlo fuera de este archivo

export class Usuario {

    // Declaramos las propiedades en el constructor para evitarnos más pasos, el orden es importante porque algunas son opcionales
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google: boolean = false,
        public _id?: string
        ){

    }

}

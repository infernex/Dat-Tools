export class CloudinaryResource {


    id: any;
    url: string;
    name:string;
    secureUrl: string;
    type: string;
    size: number;
    duracion:number;
    public_id: string;
    format:string;


    constructor() {

        this.id = null;
        this.url = null;
        this.secureUrl = null;
        this.type = null;
        this.size = null;
        this.duracion = 0;
        this.public_id;
        this.format = null;

    }
}
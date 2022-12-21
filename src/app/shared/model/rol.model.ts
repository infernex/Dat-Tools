import { Permission } from './permission.model';

export class Rol {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
    constructor() {
        this.id = null;
        this.name = null;
        this.description = null;
    }
}
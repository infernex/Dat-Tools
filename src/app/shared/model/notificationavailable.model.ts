import { NotificationSetting } from './notificationsetting.model';

export class NotificationAvailable {

    notificationAvailableId: number;
   
    name: string;
    descripcion: string;
 
    notificationSetting:NotificationSetting;

    constructor() {
        this.notificationAvailableId=0;
        this.name=null;
        this.descripcion=null;
        this.notificationSetting=null;
    }

}
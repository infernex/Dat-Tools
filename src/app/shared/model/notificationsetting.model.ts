
export class NotificationSetting {

    notificationSettingId: number;
    fkNotificationAvailable: number;
    fkUserId: string;
    throughWhatsapp: number;
    throughMail: number;
    whatsappActivated:boolean;
    mailActivated:boolean

    constructor() {
        this.notificationSettingId = 0;
        this.fkUserId = null;
        this.throughWhatsapp = 0;
        this.throughMail = 0;
        this.whatsappActivated=false;
        this.mailActivated=false;
    }

}

export class Suscription {

    suscriptionId: string;
    startDate: string;
    endDate: string;
    fkStatusId: string;
    fkUserId: string;
    fkSuscriptionTypePlanId: string;
    fkPaymentId: string;
    suscriptionType: string;

    constructor() {
        this.suscriptionId = null;
        this.startDate = null;
        this.endDate = null;
        this.fkStatusId = null;
        this.fkUserId = null;
        this.fkSuscriptionTypePlanId = null;
        this.suscriptionType = null;



    }
}
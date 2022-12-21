export enum Sexo {
    Masculino = "M",
    Femenino = "F",

}
export enum EstadosDashboard {
    Privado = "Privado",
    Publico = "Publico"
}


export enum EstadosInscripciones {
    Autorizado = "Autorizado",
    NoAutorizado = "No Autorizado",
    VerificandoCodigosSMLink = "Verificando Codigos SMLink",
    VerificandoCodigosCompraClick = "Verificando Codigo Compra-Click",
    CodigosRechazados = "Rechazados"
}
export enum EstadosCertificados {
    Deshabilitado = 1,
    Aprobacion = 2,
    Participacion = 3



}

export enum EstadosCurso {
    Publicado = "Publicado",
    Proximamente = "Proximamente",
    NoPublicado = "",
    Cerrado = "Cerrado",
}

export enum EstadosModulo {
    Publicado = "Publicado",
    NoPublicado = ""
}

export enum EstadoSubtopicUser {
    Marcado = "Marcado",
    Desmarcar = ""
}

export enum domains {
    dominioLocalhost = "http://localhost:4200/#/",
    dominioApisitio = "https://training.dat-analytics.com/#/",
    dominioDatAnalytics = "https://dat-analytics.com/#/"
}

export enum DefaultImage {
    urlDashPicture = "assets/img/Dashboards/noImage.png",

    urlLogoDatAnalytics = "assets/img/logos/logooficial.png",
    urlPictureProfile = "https://res.cloudinary.com/djokqylda/image/upload/v1585585883/Dat-Analytics/Iconos/default-avatar_w2uct5.png",
    urlCoverCareer = "https://res.cloudinary.com/djokqylda/image/upload/v1588091136/Dat-Training/Imagenes%20Demo/career-default_iqnaov.png",
    urlCoverCourse = "https://res.cloudinary.com/djokqylda/image/upload/v1588624087/Dat-Training/Imagenes%20Demo/courseDefault_x0phxz.png",
    urlBannerDatClass = "https://res.cloudinary.com/djokqylda/image/upload/v1618001661/Dat-Training/Imagenes%20Demo/dat-live_n1yhd3.jpg",
    urlLogoTraining = "https://res.cloudinary.com/djokqylda/image/upload/v1612388838/Dat-Training/Imagenes%20Demo/icons/LOGOS_DATAS_SIN_FONDO-03_qvfdf7.png"
}


export enum DefaultResource {
    urlVideo = "https://res.cloudinary.com/djokqylda/video/upload/v1590616211/Dat-Training/Videos%20Demo/dat_about_qsslj4.mp4"
}

export enum FileTypes {
    OnlyImagesDash = "onlyimagesdash",
    OnlyImages = "onlyimages",
    OnlyVideos = "onlyvideos",
    PDF_VIDEO_IMG = "pdf_vid_img",
    VariousTypes = "v_types_of_files"
}
export enum DashboardTypes {
    Tableau = "tableau",
    PowerBI = "powerbi",
    Canva = "canva"
}
export enum DashboardTypesNumber {
    Sin_tipo = 1,
    Tableau = 2,
    PowerBI = 3,

}


export enum MessageTypes {
    Text = 1
}

export enum ChatTypes {
    Private = 1,
    Group = 2
}

export enum PaymentMode {
    Paypal = 1,
    SmartLink = 2,
    Stripe = 3,
    CompraClick = 4,
    SmartMoney = 5
}

export enum ItemType {
    Payment = 1,
    Free = 2,
    Private = 3,
    VirtualSincronico = 4
}
export enum LiveStatus {
    Hidden = 1,
    Live = 2,
    Finished = 3,
    Next = 4,

}

export enum LastDatClasses {
    available = 1,
    unavailable = 2,

}

export enum ExamStatus {
    Publicado = "Publicado",
    NoPublicado = "No Publicado"
}

export enum ExamAnswerStatus {
    Aprobado = "Aprobado",
    Reprobado = ""
}

export enum DatNotificationAvailable {
    nextDatClassNotification = 1

}

export enum NotificationDestination {
    whatsApp = 1,
    email = 2

}

export enum Language {
    English = 1,
    Spanish = 2
}

export enum AdStatus {
    Publicado = 1,
    NoPublicado = 2,
}

export enum AdType {
    CourseAd = 1,
    PromotionAd = 2,
    GeneralAd = 3,

}


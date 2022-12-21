import { Component, OnInit, ViewChild } from '@angular/core';
import { User, CloudinaryResource } from 'app/shared/model/model.api';
import { DefaultImage, FileTypes } from 'app/shared/model/constantes';
import { AppHandlerService, UserService, ParametersService } from 'app/shared/services/services.api';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { CertificateService } from 'app/shared/services/certificate.service';
import { verify } from 'crypto';
import { UploadFileComponent } from 'app/shared/upload-file/upload-file.component';

@Component({
  selector: 'app-user-profile-layout',
  templateUrl: './user-profile-layout.component.html',
  styleUrls: ['./user-profile-layout.component.scss']
})
export class UserProfileLayoutComponent implements OnInit {

  isLogin: boolean;

  userProfile: User;

  fullName: string
  userName: string
  email: string
  urlprofilepicture: string = DefaultImage.urlPictureProfile;
  loading: boolean;
  // certificate: Certificate;
  certificateIdreceived: number = 0;
  isOwnerCertificate: boolean;

  errors: string[] = [];

  waitingResponse: boolean;

  filetype: string = FileTypes.OnlyImages;

  @ViewChild('uploadfile', { static: false }) uploadFileComponent: UploadFileComponent;
  constructor(private appSrv: AppHandlerService,
    private userProfileSrv: UserService,
    private router: Router,
    private parametersSrv: ParametersService,
  ) {

  }
  ngOnInit() {

    this.certificateIdreceived = 0;
    this.parametersSrv.activateFullFooter$.emit(false);
    //const mainPanelHome = <HTMLElement>document.getElementsByClassName('dat-main-home')[0];

    //mainPanelHome.classList.remove('dat-dark');
    // this.certificate = new Certificate();
    //recibiendo parametro para mostrar pestania de certificado
    // this.parametersSrv.certificateId$.subscribe(certificatereceivedId => {
    //   setTimeout(() => {
    //     this.certificateIdreceived = certificatereceivedId;
    //     this.verifyIsLogin();
    //   }, 100);

    // });

    // this.parametersSrv.certificate$.subscribe(certificatereceived => {
    //   this.certificate = certificatereceived;
    //   if (this.certificateIdreceived != 0) {
    //     this.userName = this.certificate.userName;
    //     this.fullName = this.certificate.fullName;
    //si no hay imagen
    // if (this.certificate.urlProfilePicture == null || this.certificate.urlProfilePicture == "") {
    //   this.urlprofilepicture = DefaultImage.urlPictureProfile;
    // }
    // else {
    //   this.urlprofilepicture = this.certificate.urlProfilePicture;
    // }

    //verificar si el certificado es del usuario logueado
    //   if (this.isLogin) {
    //     if (this.certificate.userId == this.appSrv.getCurrentUser().id) {
    //       this.isOwnerCertificate = true;
    //     }
    //     else {
    //       this.isOwnerCertificate = false;
    //     }
    //   }


    //   this.loading = false;
    // }

    //   });

    this.verifyIsLogin();
  }

  verifyIsLogin() {

    this.isLogin = this.appSrv.isLogin();
    this.loading = true;
    if (this.isLogin) {
      this.userProfileSrv.getById(this.appSrv.getCurrentUser().id).subscribe(resp => {
        this.userProfile = resp;

        // if ((this.certificate.userId != this.appSrv.getCurrentUser().id) && this.certificateIdreceived != 0) {
        //   this.userName = this.certificate.userName;
        //   this.fullName = this.certificate.fullName;
        //   this.email = this.certificate.email;
        //si no hay foto de perfil en los datos de certificado
        //   if (this.certificate.urlProfilePicture == null || this.certificate.urlProfilePicture == "") {
        //     this.urlprofilepicture = DefaultImage.urlPictureProfile;
        //   }
        //   else {
        //     this.urlprofilepicture = this.certificate.urlProfilePicture;
        //   }
        // }
        // else {
        this.userName = this.userProfile.userName;
        this.fullName = this.userProfile.fullName;
        this.email = this.userProfile.email;


        //si no hay foto de perfil
        if (this.userProfile.urlProfilePicture == null || this.userProfile.urlProfilePicture == "") {
          this.urlprofilepicture = DefaultImage.urlPictureProfile;
        }
        else {
          this.urlprofilepicture = this.userProfile.urlProfilePicture;
        }
        // }

        this.loading = false;
      });
    }
    else {


    }
  }

  resetIdcertificatereceived() {
    this.certificateIdreceived = 0;
    this.isOwnerCertificate = false;
  }

  save() {

    this.waitingResponse = true;
    //limpiar errores previos
    this.errors = [];


    //asignar valores a nuestro modelo de datos   
    //this.assignValues();

    //salvar
    if (this.userProfile.id == null) {
      this.userProfileSrv.create(this.userProfile).subscribe((resp: any) => {

        if (resp.succeeded) {
        } else {
          this.handlerError(resp);
        }
        this.waitingResponse = false;
        this.uploadFileComponent.closeDialog();

      }, (err) => {
        this.errors = this.appSrv.getErrosMessages(err);
      });

      //update
    } else {
      this.userProfileSrv.update(this.userProfile.id, this.userProfile).subscribe((resp: any) => {

        console.log(resp.id);
        this.urlprofilepicture = resp.urlProfilePicture;
        if (resp.succeeded || resp.id != null || resp.id != undefined) {

        } else {
          this.handlerError(resp);
        }
        this.waitingResponse = false;
        this.uploadFileComponent.closeDialog();
      }, (err) => {
        console.log(err)
        this.errors = this.appSrv.getErrosMessages(err);
      });
    }


  }

  handlerError(res: any) {
    this.errors = [];
    res.errors.forEach(element => {
      this.errors.push(element.description);
    });
  }

  onuploadedResource(resource: CloudinaryResource) {
    this.userProfile.urlProfilePicture = resource.secureUrl;
    this.userProfile.publicIdCloudinary = resource.public_id;

    //this.resetForm();
    this.save();

  }

  uploadFile() {
    this.uploadFileComponent.showUploadFileComponent();
  }

}

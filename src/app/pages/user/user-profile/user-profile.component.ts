import { Component, OnInit } from '@angular/core';
import { AppHandlerService, UserService, ParametersService } from 'app/shared/services/services.api';
import { Router } from '@angular/router';
import { User } from 'app/shared/model/model.api';
import { DefaultImage, Sexo } from 'app/shared/model/constantes';

@Component({
  selector: 'user-cmp',
  moduleId: module.id,
  templateUrl: 'user-profile.component.html'
})


export class UserProfileComponent implements OnInit {
  isLogin: boolean;

  userProfile: User;

  fullName: string
  userName: string
  email: string
  telefono: string;
  genero: string;
  urlprofilepicture: string = DefaultImage.urlPictureProfile;
  loading: boolean;
  fechaNacimiento: Date;
  pageName: string = "Perfil"
  constructor(private appSrv: AppHandlerService,
    private userProfileSrv: UserService,
    private router: Router,
    private parametersSrv: ParametersService) {

  }
  ngOnInit() {

    //this.parametersSrv.certificateId$.emit(0);
    this.isLogin = this.appSrv.isLogin();
    this.parametersSrv.showPageName$.emit(this.pageName);

    this.loading = true;
    if (this.isLogin) {
      this.userProfileSrv.getById(this.appSrv.getCurrentUser().id).subscribe(resp => {
        this.userProfile = resp;
        this.userName = this.userProfile.userName;
        this.fullName = this.userProfile.fullName;
        this.email = this.userProfile.email;
        this.telefono = this.userProfile.telefono;
        this.fechaNacimiento = this.userProfile.fechaNacimiento;

        if (this.userProfile.sexo == Sexo.Femenino) {
          this.genero = "Femenino";
        }
        else if (this.userProfile.sexo == Sexo.Masculino) {
          this.genero = "Masculino";
        }

        //si no hay imagen
        if (this.userProfile.urlProfilePicture == null || this.userProfile.urlProfilePicture == "") {
          this.urlprofilepicture = DefaultImage.urlPictureProfile;
        }
        else {
          this.urlprofilepicture = this.userProfile.urlProfilePicture;
        }
        this.loading = false;
      });
    }
    else {
      this.router.navigate(['']);
    }


  }
}

import { Component, OnInit } from '@angular/core';
import { AppHandlerService, UserService } from 'app/shared/services/services.api';
import { Router } from '@angular/router';
import { User } from 'app/shared/model/model.api';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { DefaultImage, Sexo } from 'app/shared/model/constantes';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {

  errors: string[] = [];

  isLogin: boolean;

  userProfile: User;

  userProfileForm: FormGroup;
  today: Date;

  sexos: SelectItem[];

  urlprofilepicture: string = DefaultImage.urlPictureProfile;

  constructor(
    private appSrv: AppHandlerService,
    private userProfileSrv: UserService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _location: Location
  ) { }

  ngOnInit() {

    this.userProfile = new User();

    this.userProfile.fechaNacimiento = null;

    this.isLogin = this.appSrv.isLogin();

    this.loadDropdown();

    this.createForm();

    if (this.isLogin) {
      this.userProfileSrv.getById(this.appSrv.getCurrentUser().id).subscribe(resp => {
        this.userProfile = resp;

        this.userProfile.fechaNacimiento = new Date(this.userProfile.fechaNacimiento);
        //si no hay imagen
        if (this.userProfile.urlProfilePicture == null || this.userProfile.urlProfilePicture == "") {
          this.urlprofilepicture = DefaultImage.urlPictureProfile;
        }
        else {
          this.urlprofilepicture = this.userProfile.urlProfilePicture;
        }
        // this.userProfileForm.controls['fullName'].setValue(this.userProfile.fullName);
        // this.userProfileForm.controls['userName'].setValue(this.userProfile.userName);
        // this.userProfileForm.controls['email'].setValue(this.userProfile.email);
        // this.userProfileForm.controls['telefono'].setValue(this.userProfile.telefono);
        this.resetForm();

      });
    }
    else {
      this.router.navigate(['']);
    }

  }

  assignValues() {
    Object.assign(this.userProfile, this.userProfileForm.value);
  }



  createForm() {
    this.userProfileForm = this.fb.group(this.userProfile);


    this.userProfileForm.controls['fullName'].setValidators(Validators.required);
    this.userProfileForm.controls['userName'].setValidators(Validators.required);
    this.userProfileForm.controls['email'].setValidators([Validators.email, Validators.required, Validators.pattern('[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{1,}')]);
    this.userProfileForm.controls['telefono'].setValidators(Validators.pattern("^\\+(?:[0-9] ?){6,14}[0-9]$"));
    this.userProfileForm.controls['fechaNacimiento'].setValidators(Validators.required);




  }

  backClicked() {
    this._location.back();
  }

  save() {

    //limpiar errores previos
    this.errors = [];


    //this.resetForm();

    this.assignValues();

    //console.log(this.userProfile.id);

    this.userProfileSrv.update(this.userProfile.id, this.userProfile).subscribe((resp: any) => {

      //this.userProfile=resp;

      if (resp.succeeded || resp.errors == undefined) {
        this.toastr.info(
          '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message">Perfil <b>actualizado</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-bottom-center"
          }
        );

        this.router.navigateByUrl('/profile');
      } else {
        console.log(resp.erros)
        resp.errors.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName':
              setTimeout(() => {
                this.toastr.error('Usuario ' + this.userProfile.userName + ' no disponible', 'Registro Fallido', {
                  positionClass: 'toast-top-center'
                });
              }, 500);

              break;

            default:
              this.toastr.error(element.description, 'Registro fallido');
              break;
          }
        });
      }

    }, (err) => {
      this.errors = this.appSrv.getErrosMessages(err);
    });


  }


  resetForm() {

    this.userProfileForm.reset(this.userProfile);
  }

  loadDropdown() {

    //sexos
    this.sexos = [];
    this.sexos.push({ label: "Seleccionar sexo", value: null });
    this.sexos.push({ label: "Femenino", value: Sexo.Femenino });
    this.sexos.push({ label: "Masculino", value: Sexo.Masculino });
    this.sexos.push({ label: "Otro", value: null });
  }

  formatearFecha(fecha: Date) {

    let fechaFormateada = "";

    fechaFormateada = "" + fecha.getFullYear();

    if ((fecha.getMonth() + 1) < 10) {
      fechaFormateada += "-0" + (fecha.getMonth() + 1);
    }
    else {
      fechaFormateada += "-" + (fecha.getMonth() + 1);
    }

    if (fecha.getDate() < 10) {
      fechaFormateada += "-0" + fecha.getDate();
    }
    else {
      fechaFormateada += "-" + fecha.getDate();
    }

    return fechaFormateada;
  }

}



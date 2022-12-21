import { Component, OnInit, ViewChild } from '@angular/core';
import { User, Rol, CloudinaryResource } from 'app/shared/model/model.api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, AppHandlerService, RolService } from 'app/shared/services/services.api';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DefaultImage, FileTypes, Sexo } from 'app/shared/model/constantes';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [ConfirmationService]
})
export class RegistrationComponent implements OnInit {


  user: User;
  registrationForm: FormGroup;
  roles: Rol[];

  errors: string[] = [];
  display: boolean = false;

  rangos: any[];
  areas: any[];
  cargos: any[];

  urlprofilepicture: string = DefaultImage.urlPictureProfile;
  logoTraining: string = DefaultImage.urlLogoTraining;

  filetype: string = FileTypes.OnlyImages;

  checked: boolean = false;

  typePassword: string = "password";

  eyePassword: boolean = true;

  today: Date;
  sexos: SelectItem[];
  // datePickerConfig = {
  //   format: 'YYYY-MM-DD HH:mm',
  //   monthFormat: 'MMM, YYYY',
  //   startDate: '01.01.2012',
  // }
  constructor(public userSrv: UserService,
    private rolSrv: RolService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private appSrv: AppHandlerService,
    private _location: Location,
    private router: Router,
    private confirmationSrv: ConfirmationService) { }

  ngOnInit() {



    this.user = new User();

    const tiempoTranscurrido = Date.now();
    this.today = new Date(tiempoTranscurrido);
    this.user.fechaNacimiento = null;
    this.loadDropdown();
    this.createForm();
    this.resetForm();

    // this.userSrv.formModel.reset();
    this.rangos = [
      { codigo: "(0-50)", nombre: "(0-50)" },
      { codigo: "(50-100)", nombre: "(50-100)" },
      { codigo: "(100+)", nombre: "(100+)" }
    ];

    this.areas = [
      { codigo: "Administración", nombre: "Administración" },
      { codigo: "Administración de productos", nombre: "Administración de productos" },
      { codigo: "Análisis", nombre: "Análisis" },
      { codigo: "Compras", nombre: "Compras" },
      { codigo: "Fabricación", nombre: "Fabricación" },
      { codigo: "Finanzas", nombre: "Finanzas" },
      { codigo: "Ingeniería/I+D", nombre: "Ingeniería/I+D" },
      { codigo: "Legal", nombre: "Legal" },
      { codigo: "Marketing", nombre: "Marketing" },
      { codigo: "Recursos humanos", nombre: "Recursos humanos" },
      { codigo: "Socio de canal", nombre: "Socio de canal" },
      { codigo: "Soporte/servicio", nombre: "Soporte/servicio" },
      { codigo: "TI", nombre: "TI" },
      { codigo: "Ventas" }
    ];

    this.cargos = [
      { codigo: "Analista", nombre: "Analista" },
      { codigo: "Arquitecto", nombre: "Arquitecto" },
      { codigo: "CEO/presidente", nombre: "CEO/presidente" },
      { codigo: "Consultor/integrador de sistemas", nombre: "Consultor/integrador de sistemas" },
      { codigo: "Coordinador/especialista", nombre: "Coordinador/especialista" },
      { codigo: "Decano/rector", nombre: "Decano/rector" },
      { codigo: "Desarrollador/ingeniero", nombre: "Desarrollador/ingeniero" },
      { codigo: "Director", nombre: "Director" },
      { codigo: "Estudiante", nombre: "Estudiante" },
      { codigo: "Nivel directivo", nombre: "Nivel directivo" },
      { codigo: "Profesor", nombre: "Profesor" },
      { codigo: "Responsable", nombre: "Responsable" },
      { codigo: "Vicepresidente", nombre: "Vicepresidente" }

    ]



  }

  backClicked() {
    this._location.back();
  }


  loadDropdown() {

    //sexos
    this.sexos = [];
    this.sexos.push({ label: "", value: null });
    this.sexos.push({ label: "Femenino", value: Sexo.Femenino });
    this.sexos.push({ label: "Masculino", value: Sexo.Masculino });
    this.sexos.push({ label: "Otro", value: null });
  }

  createForm() {
    this.registrationForm = this.fb.group(this.user, { validator: this.comparePasswords });
    this.registrationForm.controls['userName'].setValidators([Validators.required, Validators.pattern(/^[a-zA-Z^áéíóúñüÁÉÍÓÚÑÜ]+[0-9]*$/)]);
    this.registrationForm.controls['email'].setValidators([Validators.email, Validators.required, Validators.pattern('[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{1,}')]);
    this.registrationForm.controls['fullName'].setValidators([Validators.required, Validators.pattern(/^[a-zA-Z\s/^áéíóúñüÁÉÍÓÚÑÜ]*$/)]);

    this.registrationForm.controls['telefono'].setValidators(Validators.pattern("^\\+(?:[0-9] ?){6,14}[0-9]$"));
    this.registrationForm.controls['referencia'];
    this.registrationForm.controls['fechaNacimiento'].setValidators(Validators.required);
    this.registrationForm.controls['rangoEmpleados'];
    this.registrationForm.controls['pais'];
    this.registrationForm.controls['area'];
    this.registrationForm.controls['cargo'];
    this.registrationForm.controls['cedula'];
    this.registrationForm.controls['check'];

    // this.registrationForm.controls['password'].setValidators([Validators.required, Validators.minLength(8)]);
    this.registrationForm.controls['password'].setValidators([
      Validators.required, Validators.minLength(8),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.()+={}|,;:<>]).{8,}$')
    ]);
    this.registrationForm.controls['confirmPassword'].setValidators(Validators.required);


  }

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('confirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  resetForm() {
    this.registrationForm.reset(this.user);

  }


  assignValues() {

    Object.assign(this.user, this.registrationForm.value);

    if (this.user.urlProfilePicture == null || this.user.urlProfilePicture == "") {
      this.urlprofilepicture = DefaultImage.urlPictureProfile;
    }
    else {
      this.urlprofilepicture = this.user.urlProfilePicture;
    }


  }

  showPassword() {

    //this.userForm.controls['password'].set 

    if (this.typePassword === 'password') {
      this.typePassword = 'text';
      this.eyePassword = false;

    }
    else {
      this.typePassword = 'password';
      this.eyePassword = true;
    }

  }

  save() {

    //limpiar errores previos
    this.errors = [];

    //asignar valores a nuestro modelo de datos   
    this.assignValues();

    //salvar
    if (this.user.id == null) {

      this.userSrv.create(this.user).subscribe((res: any) => {

        if (res.succeeded) {

          this.toastr.info(
            '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message">Se ha creado el usuario con <b>éxito</b></span>',
            "",
            {
              timeOut: 4000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-success alert-with-icon",
              positionClass: "toast-top-center"
            }
          );

          this.router.navigateByUrl('/login');
        } else {
          res.errors.forEach(element => {
            console.log(res.errors);
            switch (element.code) {
              case 'DuplicateUserName':

                this.toastr.info(
                  '<span data-notify="icon" class="nc-icon nc-alert-circle-i"></span><span data-notify="message"> Usuario no disponible. <b> Elija otro</b></span>',
                  "",
                  {
                    timeOut: 4000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-danger alert-with-icon",
                    positionClass: "toast-top-center"
                  }
                );

                break;

              case 'DuplicateEmail':

                this.toastr.info(
                  '<span data-notify="icon" class="nc-icon nc-alert-circle-i"></span><span data-notify="message"> El correo electrónico <b> ya está en uso</b></span>',
                  "",
                  {
                    timeOut: 4000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-danger alert-with-icon",
                    positionClass: "toast-top-center"
                  }
                );

                break;

              default:
                this.toastr.info(
                  '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message"> Registro <b> fallido</b>"</span>',
                  "",
                  {
                    timeOut: 4000,
                    closeButton: true,
                    enableHtml: true,
                    toastClass: "alert alert-danger alert-with-icon",
                    positionClass: "toast-top-center"
                  }
                );
                break;
            }
          });
        }

        err => {
          console.log(err);
        }



      }, (err) => {
        this.errors = this.appSrv.getErrosMessages(err);
      });
    } else {
      this.userSrv.update(this.user.id, this.user).subscribe(resp => {
        //this.objectUpdated.emit(resp);
        // console.log("ok")
      }, (err) => {
        this.errors = this.appSrv.getErrosMessages(err);
      });
    }


  }


  // function displayDatePickerIfBrowserDoesNotSupportDateType() {
  //   var datePicker = document.querySelector('.date-pick');
  //   if (datePicker && datePicker.type !== 'date') {
  //     $('.date-pick').datepicker();
  //   }
  // }

  // $(document).ready(function($) {
  //   displayDatePickerIfBrowserDoesNotSupportDateType();
  // });


}
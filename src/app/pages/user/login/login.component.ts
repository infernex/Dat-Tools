import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, AppHandlerService } from 'app/shared/services/services.api';
import { ToastrService } from 'ngx-toastr';
import { User } from 'app/shared/model/model.api';
import { ResetPwdComponent } from 'app/pages/user/reset-pwd/reset-pwd.component'
import { WelcomeUserComponent } from 'app/pages/notifications/welcome-user/welcome-user.component'
import { DefaultImage } from 'app/shared/model/constantes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;

  userForm: FormGroup;
  errors: string[] = [];
  logoTraining: string = DefaultImage.urlLogoDatAnalytics;

  typePassword: string = "password";

  eyePassword: boolean = true;

  constructor(private fb: FormBuilder,
    private userSrv: UserService,
    private appSrv: AppHandlerService,
    private toastr: ToastrService) { }

  @ViewChild('editPwd', { static: false }) editPwdComponent: ResetPwdComponent;
  @ViewChild('welcomeUser', { static: false }) WelcomeComponent: WelcomeUserComponent;


  ngOnInit() {

    //
    if (this.appSrv.isLogin())
      this.appSrv.goToHome();
    // this.appSrv;
    //    
    this.user = new User();
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group(this.user);
    this.userForm.controls['userName'].setValidators(Validators.required);
    this.userForm.controls['password'].setValidators(Validators.required);
  }

  assignValues() {
    Object.assign(this.user, this.userForm.value);
  }


  checkUser() {
    this.WelcomeComponent.welcomeUser();
  }


  login() {

    //limpiar errores previos
    this.errors = [];

    //asignar valores a nuestro modelo de datos   
    this.assignValues();

    //login
    this.userSrv.login(this.user).subscribe(
      (res: any) => {


        this.appSrv.logIn(res.token);

        if (this.appSrv.getCurrentUser().firstLogin) {

          this.checkUser();

        }
      },
      err => {
        console.log(err);
        if (err.status == 400)
          this.toastr.info(
            '<span data-notify="icon" class="nc-icon nc-alert-circle-i"></span><span data-notify="message"> Usuario o contraseña <b> incorrectas.</b></span>',
            "",
            {
              timeOut: 4000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-danger alert-with-icon",
              positionClass: "toast-top-left"
            }
          );
        else
          this.toastr.error(err.error.message, 'Login');
      });
  }

  resetPwd() {
    this.editPwdComponent.send();
  }


  onObjectCreated(user: User) {

    //cerrar
    this.userForm.controls['userName'].setValue("");
    this.userForm.controls['password'].setValue("");
    this.editPwdComponent.closeDialog();
    this.toastr.info('Se ha restablecido su contraseña', 'Por Favor, Revise su Correo Electronico ');
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

}

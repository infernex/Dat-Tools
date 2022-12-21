import { Component, OnInit } from '@angular/core';
import { User } from 'app/shared/model/model.api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/shared/services/user.service';
import { AppHandlerService } from 'app/shared/services/services.api';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent implements OnInit {

  user: User;
  changePwdForm: FormGroup;
  errors: string[] = [];
  mnSel: number = 0;
  isLogin: boolean;
  isLoading: boolean;
  waitingResponse: boolean;
  constructor(private fb: FormBuilder,
    private userSrv: UserService,
    private appSrv: AppHandlerService,
    private toastr: ToastrService,
    private router: Router,
    private _location: Location) { }

  ngOnInit() {

    this.isLogin = this.appSrv.isLogin();

    if (this.isLogin) {
      this.init();
      this.createForm();
      this.resetForm();
    }
    else {
      this.router.navigate(['']);
    }

  }

  assignValues() {
    Object.assign(this.user, this.changePwdForm.value);
  }

  backClicked() {
    this._location.back();
  }

  createForm() {
    this.changePwdForm = this.fb.group(this.user, { validator: this.comparePasswords });
    //this.changePwdForm.controls['userName'].disable(); 
    //this.changePwdForm.controls['email'].disable();

    this.changePwdForm.controls['password'].setValidators([Validators.required, Validators.minLength(8)]);
    this.changePwdForm.controls['newPassword'].setValidators([Validators.required, Validators.minLength(8)]);
    this.changePwdForm.controls['confirmPassword'].setValidators(Validators.required);
  }

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('confirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('newPassword').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  init() {
    this.user = new User();
    this.user.id = this.appSrv.getCurrentUser().id;
    this.user.email = this.appSrv.getCurrentUser().email;
    this.user.userName = this.appSrv.getCurrentUser().userName;
  }

  resetForm() {
    this.changePwdForm.reset(this.user);
  }


  save() {

    this.waitingResponse = true;
    //limpiar errores previos
    this.errors = [];

    //asignar valores a nuestro modelo de datos   
    this.assignValues();
    this.isLoading = true;
    //salvar  
    this.userSrv.changePwd(this.user).subscribe((resp: any) => {
      this.waitingResponse = false
      if (resp.succeeded) {

        this.toastr.info(
          '<span data-notify="icon" class="now-ui-icons ui-1_check"></span><span data-notify="message">Contraseña <b>actualizada</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-bottom-center"
          }
        );
        this.resetForm();
        this.router.navigateByUrl('/profile');
      } else {
        this.waitingResponse = false;
        this.handlerError(resp);
      }
    }, (err) => {
      this.errors = this.appSrv.getErrosMessages(err);
    });
  }


  handlerError(res: any) {
    this.errors = [];
    res.errors.forEach(element => {
      this.errors.push(element.description);
    });
  }

}

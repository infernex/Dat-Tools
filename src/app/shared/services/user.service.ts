import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { User } from '../model/model.api';
import { CoreService } from './core.service';
import { AppHandlerService } from './app.handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CoreService<User, string> {


  opcionSeleccionado: string = '0';

  constructor(private fb: FormBuilder, http: HttpClient, private appSrv: AppHandlerService) {
    super(appSrv.getApiURI() + "ApplicationUser", http);
  }

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', [Validators.email, Validators.required, Validators.pattern('[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{1,}')]],
    FullName: [''],
    Telefono: ['', Validators.pattern("^\\+(?:[0-9] ?){6,14}[0-9]$")],
    Referencia: [''],
    RangoEmpleados: [''],
    Pais: [''],
    Area: [''],
    Cargo: [''],
    fechaNacimiento: ['', [Validators.required]],
    sexo: [''],
    roles: [],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(8),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Telefono: this.formModel.value.Telefono,
      Referencia: this.formModel.value.Referencia,
      RangoEmpleados: this.formModel.value.RangoEmpleados,
      Pais: this.formModel.value.Pais,
      fechaNacimiento: this.formModel.value.fechaNacimiento,
      sexo: this.formModel.value.sexo,
      Area: this.formModel.value.Area,
      Cargo: this.formModel.value.Cargo,
      Password: this.formModel.value.Passwords.Password,
      roles: [],

    };
    console.log(body);
    // return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
    return this.http.post(this.base, body);
  }

  login(formData) {
    return this.http.post(this.base + '/Login', formData);
  }

  resetPwd(user: User) {

    return this.http.post<any>(this.base + "/ResetPwd", user, this.httpOptions);
  }

  changePwd(user: User) {
    return this.http.post<any>(this.base + "/ChangePwd/" + user.id, user, this.httpOptions);
  }

}
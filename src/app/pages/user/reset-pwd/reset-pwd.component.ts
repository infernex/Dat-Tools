import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'app/shared/model/model.api';
import { UserService } from 'app/shared/services/services.api';
import { ConfirmationService } from 'primeng/api';
import { DefaultImage } from 'app/shared/model/constantes';


@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss'],
  providers: [ConfirmationService]

})
export class ResetPwdComponent implements OnInit {

  user: User;
  userForm: FormGroup;
  errors: string[] = [];
  display: boolean = false;
  //llamado en html
  isLoading: boolean ;
  logoTraining:string= DefaultImage.urlLogoTraining;

  @Output() objectCreated = new EventEmitter<User>();
  @Output() objectUpdated = new EventEmitter<User>(); 
  @Output() objectDeleted = new EventEmitter<User>();


  constructor(
    private fb: FormBuilder,
    private userSrv: UserService, 
    private toastr: ToastrService) { }

    ngOnInit() {
      this.init();
      this.createForm();
      this.resetForm();
    }
    send(){
      this.init();
      this.resetForm();
      this.showDialog();
    }
  
    init(){
      this.user = new User();
      // this.user.id = this.appSrv.getCurrentUser().id;    
    }
  
    createForm(){
      this.userForm = this.fb.group(this.user);   
      this.userForm.controls['userName'].setValidators([Validators.required,Validators.pattern(/^[a-zA-Z\s/^áéíóúñüÁÉÍÓÚÑÜ]*$/)]);
      this.userForm.controls['email'].setValidators([Validators.email,Validators.required,Validators.pattern('[a-zA-Z0-9._+-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{1,}')]); 
      // this.userForm.controls['fullName'].setValidators([Validators.required,Validators.pattern(/^[a-zA-Z\s/^áéíóúñüÁÉÍÓÚÑÜ]*$/)]);
  
     
    }
  
  
    add(){    
      this.user = new User();
      this.resetForm();
      this.showDialog();
    }
  
  
    isNew(): boolean {
      return this.user.id != null;
    }
  
    resetForm(){    
      this.userForm.reset(this.user);
    }
  
    assignValues(){
      Object.assign(this.user,this.userForm.value);
    }
    
    showDialog() {
      this.display = true;
    }
  
    closeDialog() {
      this.display = false;
    }
  
    resetPwd(){
  
      //limpiar errores previos
      this.errors = [];
  
      //asignar valores a nuestro modelo de datos   
      this.assignValues();    
    
      this.userSrv.resetPwd(this.user).subscribe(resp=>{      
        this.objectCreated.emit(resp);
        
      }, (err) => {
        console.log(err);
        if (err.status == 400)
          this.toastr.error('Usuario o Email incorrectos.','Vuelva a Intentarlo');             
        else
          this.toastr.error(err.error.message,'Vuelva a Intentarlo');          
      });
  
  
    }
  
    handlerError(res:any ){
      this.errors=[];    
      res.errors.forEach(element => {
        this.errors.push(element.description);    
      });
    }
  }
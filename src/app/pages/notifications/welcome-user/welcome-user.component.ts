import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'app/shared/model/model.api';
import { UserService } from 'app/shared/services/services.api';
import { ConfirmationService } from 'primeng/api';
import Swal from "sweetalert2";
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.scss'],
  providers: [ConfirmationService]

})
export class WelcomeUserComponent implements OnInit {
  title = 'sweetAlert';
  user: User;
  errors: string[] = [];
  display: boolean = false;

  @Output() objectCreated = new EventEmitter<User>();
  @Output() objectUpdated = new EventEmitter<User>();
  @Output() objectDeleted = new EventEmitter<User>();


  constructor(
    private userSrv: UserService,
    private toastr: ToastrService,
    private router: Router,
    private confirmationSrv: ConfirmationService) { }

  ngOnInit() {
    this.init();

  }

  init() {
    this.user = new User();
  }

  // Notificacines de bienvenida al loguearse por primera vez el usuario.
  welcomeUser() {


    Swal.fire({
      title: '<strong  style=" text-transform: uppercase; color: #252422; font-size: 18px; " > Bienvenidos a Dat-Training</strong>',
      icon: 'info',
      html:
        '<strong style="    color: #66615B;   font-size: 14px;"  >Vamos hacer un recorrido de lo que puedes hacer</strong>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        ' <i class="fas fa-paper-plane"></i> <a style= "color: white; "> Explorar </a>',

      confirmButtonAriaLabel: 'Thumbs up, great!',
      confirmButtonColor: '#1E87F0',
      cancelButtonText:
        ' Declinar <i class="fas fa-times"></i>',
      cancelButtonColor: '#D11E00',
      cancelButtonAriaLabel: 'Thumbs down',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown'
      }

    }).then((result) => {

      if (result.isConfirmed) {

        //  --------------------------------------------------------------------------       
        Swal.fire({
          width: 450,
          position: 'top',
          title: '<strong>  <i class="fas fa-arrow-right" style= "margin-left: 622px;  color: #252422; font-size: 40px;"></i> </strong>',
          html:
            '<strong style="    color: #66615B;   font-size: 14px;"  >Desplegando  Dat-training se le mostrara los cursos, carreras e instructores. En este instante nos encontramos en la pantalla principal. Ahora iremos a carreras. </strong>',
          confirmButtonText:

            ' <i class="fas fa-paper-plane"></i>  <a href="/#/careers" style= "color: white; "; > Ir a Carreras </a>',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          confirmButtonColor: '#1E87F0',
          showClass: {
            popup: 'animate__animated animate__fadeInLeft'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutRight'
          }

        }).then((result) => {

          if (result.isConfirmed) {
            //  --------------------------------------------------------------------------       

            Swal.fire({
              width: 400,
              icon: 'info',
              html:
                '<strong style="    color: #66615B;   font-size: 14px;"  > Haz click en los titulos de las carreras para acceder  a los cursos de acuerdo a tus intereses, ahora iremos a cursos.</strong>',
              confirmButtonText:

                ' <i class="fas fa-paper-plane"></i>  <a href="/#/" style= "color: white; "; > Ir a Cursos </a>',
              confirmButtonAriaLabel: 'Thumbs up, great!',
              confirmButtonColor: '#1E87F0',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutDown'
              }

            }).then((result) => {

              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                //  --------------------------------------------------------------------------       

                Swal.fire({
                  width: 400,
                  icon: 'info',
                  html:
                    '<strong style="    color: #66615B;   font-size: 14px;"  > Puedes hacer click en los titulos de los cursos o directamente al boton Ir a curso, para acceder a su contenido.</strong>',
                  confirmButtonText:

                    ' <a  style= "color: white; "; > Entendido </a> <i class="fa fa-thumbs-up"></i>',
                  confirmButtonAriaLabel: 'Thumbs up, great!',
                  confirmButtonColor: '#1E87F0',
                  showClass: {
                    popup: 'animate__animated animate__fadeInUp'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutDown'
                  }

                })

              }

            })

          }

        })

      }

    })

  }



}

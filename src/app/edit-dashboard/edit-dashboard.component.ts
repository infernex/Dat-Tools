import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CloudinaryResource, Dashboard } from 'app/shared/model/model.api';
import { AppHandlerService, UserService } from 'app/shared/services/services.api';
import { FileTypes, ItemType, Language } from 'app/shared/model/constantes';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { DashboardcatService } from 'app/shared/services/dashboardcat.service';
import { DashboardService } from '../shared/services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { UploadFileComponent } from 'app/shared/upload-file/upload-file.component';
import { DefaultImage, DashboardTypes, DashboardTypesNumber } from '../shared/model/constantes';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.scss'],
  providers: [ConfirmationService]
})
export class EditDashboardComponent implements OnInit {

  filetype: string = FileTypes.OnlyImagesDash;
  dashUrlImg: string = DefaultImage.urlDashPicture;
  dashPublicIdCloud: string;
  titulo: string;
  display: boolean = false;
  isAdmin: boolean;
  isInstructor: boolean;
  waitingResponse: boolean;
  errors: string[] = [];
  dashboardForm: FormGroup;
  categoriasDashboards: SelectItem[];
  tipoDashboard: SelectItem[];
  languages: SelectItem[];
  tipoAcceso: SelectItem[];
  selectItemAccess;
  selectDashboardType;
  modes: SelectItem[];
  dashboard: Dashboard;
  hasEditPermission: boolean = true;
  hasDeletePermission: boolean = true;
  changePhoto: boolean = false;

  archivoImagen: Blob;
  base64: string = "Base64...";

  //referencia al componente uploadFile
  @ViewChild('uploadfile', { static: false }) uploadFileComponent: UploadFileComponent;
  @Output() objectCreated = new EventEmitter<Dashboard>();
  @Output() objectUpdated = new EventEmitter<Dashboard>();
  @Output() objectDeleted = new EventEmitter<Dashboard>();
  constructor(private fb: FormBuilder,
    private appSrv: AppHandlerService,
    private userSrv: UserService,
    private dashboardCatSrv: DashboardcatService,
    private dashboardSrv: DashboardService,
    private confirmationSrv: ConfirmationService,
    private toastr: ToastrService,
    private sant: DomSanitizer,
  ) { }

  displayPosition: boolean;
  position: string;

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  ngOnInit() {
    this.dashboard = new Dashboard();
    this.createForm();
    this.loadDropdown();

  }

  createForm() {
    // binding con el modelo
    this.dashboardForm = this.fb.group(this.dashboard);

    this.dashboardForm.controls['fkDashboardCategoryId'].setValidators(Validators.required);
    this.dashboardForm.controls['nombre'].setValidators(Validators.required);
    this.dashboardForm.controls['workspaceIdPowerBi'].setValidators(Validators.required);
    this.dashboardForm.controls['reportIdPowerBi'].setValidators(Validators.required);
    this.dashboardForm.controls['urlTableau'].setValidators(Validators.required);
    // this.dashboardForm.controls['urlImage'].setValidators(Validators.required);
    this.dashboardForm.controls['fkDashboardTypeId'].setValidators(Validators.required);
    this.dashboardForm.controls['fuentes'].setValidators(Validators.required);
    this.dashboardForm.controls['descripcion'].setValidators(Validators.required);
    this.dashboardForm.controls['notasMetod'].setValidators(Validators.required);
    this.dashboardForm.controls['periocidad'].setValidators(Validators.required);
    this.dashboardForm.controls['fkItemTYpe'].setValidators(Validators.required);
  }
  loadDropdown() {
    //categorias de dashboards
    this.categoriasDashboards = [];

    this.categoriasDashboards.push({ label: "Seleccione Categoria", value: null });
    this.dashboardCatSrv.getAll().subscribe(resp => {
      resp.forEach(x => {
        this.categoriasDashboards.push({ label: x.name, value: x.dashboardCategoryId });

      });

    });
    this.tipoDashboard = [];
    this.tipoDashboard.push({ label: "Seleccione el tipo de Dashboard", value: null });
    this.tipoDashboard.push({ label: "Sin tipo", value: DashboardTypesNumber.Sin_tipo });
    this.tipoDashboard.push({ label: "Tableau", value: DashboardTypesNumber.Tableau });
    this.tipoDashboard.push({ label: "PowerBI", value: DashboardTypesNumber.PowerBI });

    // TODO:
    //Tipo de dashboard (power bi o tableau)
    // this.tipoDashboard = [];

    // this.tipoDashboard.push({ label: "Seleccione Tipo de dashboard", value: null });
    // this.dashboardTypes.getAll().subscribe(resp => {
    //   resp.forEach(x => {
    //     this.categoriasDashboards.push({ label: x.name, value: x.dashboardCategoryId });

    //   });

    // });
    // console.log(this.categoriasDashboards);

    //Tipo de acceso
    this.tipoAcceso = [];
    this.tipoAcceso.push({ label: "Seleccione el tipo de Acceso", value: null });
    this.tipoAcceso.push({ label: "Gratis", value: ItemType.Free });
    this.tipoAcceso.push({ label: "Privado", value: ItemType.Private });
    this.tipoAcceso.push({ label: "De Pago", value: ItemType.Payment });

    console.log(this.tipoAcceso);
  }

  isLoginInstructor() {

    this.isAdmin = this.appSrv.getCurrentUser().isAdmin;
    this.isInstructor = this.appSrv.getCurrentUser().isInstructor;

    //si es instructor 
    if (this.isInstructor && !this.isAdmin) {
      //asignarse como instructor
      //this.course.fkInstructorId = this.appSrv.getCurrentUser().id;
      //inhabilitar seleccionar otro instructor
      // this.dashboardForm.controls['fkInstructorId'].disable();

    }
  }
  //comprobar que sea edicion de dashboard
  isNew(): boolean {
    return this.dashboard.dashboardId != 0;
  }
  //eliminar dashboard 
  delete() {
    this.closeDialog();
    this.confirmationSrv.confirm({
      message: 'Está seguro que desea eliminar este dashboard?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dashboardSrv.delete(this.dashboard.dashboardId).subscribe(resp => {
          //this.objectDeleted.emit(this.note);
          this.toastr.info(
            '<span data-notify="icon" class="now-ui-icons ui-1_check"></span><span data-notify="message">Dashboard <b>eliminado</b></span>',
            "",
            {
              timeOut: 4000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-success alert-with-icon",
              positionClass: "toast-bottom-center"
            }
          );
          this.objectDeleted.emit(resp);
        });
      },
      reject: () => {
        // this.closeDialog();
      }
    });
  }
  //editar dashboard
  edit(id: number) {

    this.dashboardSrv.getById(id).subscribe(resp => {
      this.dashboard = resp;
      this.titulo = "Editar Dashboard";
      this.changePhoto = false;
      this.isLoginInstructor();
      this.resetForm();
      this.showDialog();
      //this.setAcciones();  

    })
  }
  //Agregar dashboard
  add() {

    this.dashboard = new Dashboard();
    this.dashboard.urlImage = DefaultImage.urlDashPicture;
    this.titulo = "Nuevo Dashboard";
    this.changePhoto = false;
    this.isLoginInstructor();
    this.resetForm();
    this.showDialog();
  }
  //Guardar info de dashboard
  save() {
    this.waitingResponse = true;
    //limpiar errores previos
    this.errors = [];
    //asignar valores a nuestro modelo de datos   
    this.assignValues();
    //salvar
    if (this.dashboard.dashboardId == 0) {
      console.log("dashboard == 0");

      // this.course.fkItemTypeId = ItemType.Payment;
      this.dashboardSrv.create(this.dashboard).subscribe(resp => {
        this.waitingResponse = false;
        this.objectCreated.emit(resp);

      }, (err) => {

        this.waitingResponse = false;
        this.errors = this.appSrv.getErrosMessages(err);
      });

    } else {
      console.log("dashboard != 0");
      this.dashboardSrv.update(this.dashboard.dashboardId, this.dashboard).subscribe(resp => {
        this.waitingResponse = false;
        this.objectUpdated.emit(resp);
      }, (err) => {

        this.errors = this.appSrv.getErrosMessages(err);
        this.waitingResponse = false;
      });
    }
    console.log("El dashboard es : ");
    console.log(this.dashboard);
  }

  // Asignar valores
  assignValues() {


    Object.assign(this.dashboard, this.dashboardForm.value);
    if (this.changePhoto) {
      this.dashboard.urlImage = this.dashUrlImg;
      this.dashboard.publicIdCloudinary = this.dashPublicIdCloud;

    }

    if (this.tipoAcceso[0].value == 1) {
      this.dashboard.fkItemTYpe = ItemType.Payment;
    }
    else if (this.tipoAcceso[0].value == 2) {
      this.dashboard.fkItemTYpe = ItemType.Free;
    }
    else if (this.tipoAcceso[0].value == 3) {
      this.dashboard.fkItemTYpe = ItemType.Private;
    }

    if (this.tipoDashboard[0].value == 1) {
      this.dashboard.fkDashboardTypeId = DashboardTypesNumber.Sin_tipo;
    }
    else if (this.tipoDashboard[0].value == 2) {
      this.dashboard.fkDashboardTypeId = DashboardTypesNumber.Tableau;
    }
    else if (this.tipoDashboard[0].value == 3) {
      this.dashboard.fkDashboardTypeId = DashboardTypesNumber.PowerBI;
    }


  }
  //metodos de subida de imagenes
  onuploadedResource(resource: CloudinaryResource) {

    this.changePhoto = true;
    this.dashboard.urlImage = resource.secureUrl;
    this.dashUrlImg = resource.secureUrl;
    this.dashboard.publicIdCloudinary = resource.public_id;
    this.dashPublicIdCloud = resource.public_id;
    // this.userProfile.publicIdCloudinary = resource.public_id;

    //this.resetForm();
    //this.save();

  }

  capturarImg(e: Event) {
    const archivoCapurado = e;
    const fileSelect = archivoCapurado[0];
    this.archivoImagen = fileSelect;

    // asigna el File al formControls => para agregar obj
    // this.textoArray.controls[index].value.val = fileSelect;

    // render de la imagen => previsualizacion capturando la URL
    let imageConvert = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.archivoImagen)) as string;
    this.base64 = "Hellow"

    this.dashUrlImg = imageConvert;

    console.log(imageConvert);

    // Se envia el index del item 
    this.convertFilebase64();

  }
  // convierte el File a un string de 64 bits
  convertFilebase64(): void {

    let reader = new FileReader();
    reader.readAsDataURL(this.archivoImagen as Blob);

    reader.onloadend = () => {

      this.base64 = reader.result as string;
      // sustitucion del obj por la conversion de la imagen en 64 bits
      this.dashUrlImg = this.base64
      console.log("dash url");

      console.log(this.dashUrlImg);

    }
  }
  uploadFile() {
    this.uploadFileComponent.showUploadFileComponent();
  }
  resetForm() {
    this.dashboardForm.reset(this.dashboard);
    //limpiar errores previos
    this.errors = [];
  }

  showDialog() {
    this.display = true;
  }

  closeDialog() {
    this.waitingResponse = false;
    this.display = false;
  }
}

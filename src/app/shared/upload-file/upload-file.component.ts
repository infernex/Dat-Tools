import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders, FileDropDirective } from 'ng2-file-upload';
import { CloudinaryResource } from '../model/model.api';
import { FileTypes } from '../model/constantes';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  resourceList: CloudinaryResource[] = [];
  fileCloudinary: CloudinaryResource;

  uploader: FileUploader;

  display: boolean = false;

  titulo: string = "Cargar"

  @Input() filetypesIn: string;

  showUploadImage: boolean;
  showUploadImageDash: boolean;
  showUploadVideo: boolean;
  showUploadResource: boolean;
  showUploadFiles: boolean;

  public hasBaseDropZoneOver = false;
  public imageDataArray;

  @Output() uploadedResource = new EventEmitter<CloudinaryResource>();

  constructor(private cloudinary: Cloudinary) { }

  ngOnInit() {

    this.cloudinaryUpload();

    //para subtopic
    if (this.filetypesIn == FileTypes.PDF_VIDEO_IMG) {
      this.titulo = "Cargar archivo";
      this.showUploadImage = false;
      this.showUploadVideo = false;
      this.showUploadResource = true;
      this.showUploadFiles = false;
    }
    else if (this.filetypesIn == FileTypes.OnlyImages) {

      this.showUploadImage = true;
      this.showUploadVideo = false;
      this.showUploadResource = false;
      this.showUploadFiles = false;
      this.titulo = "Cargar imagen";

    }
    else if (this.filetypesIn == FileTypes.OnlyImagesDash) {

      this.showUploadImage = false;
      this.showUploadVideo = false;
      this.showUploadResource = false;
      this.showUploadFiles = false;
      this.showUploadImageDash = true;
      this.titulo = "Cargar imagen Dashboard";

    } else if (this.filetypesIn == FileTypes.OnlyVideos) {
      this.showUploadImage = false;
      this.showUploadVideo = true;
      this.showUploadResource = false;
      this.showUploadFiles = false;
      this.titulo = "Cargar Video";

    }
    else if (this.filetypesIn == FileTypes.VariousTypes) {
      this.titulo = "Cargar archivo";
      this.showUploadImage = false;
      this.showUploadVideo = false;
      this.showUploadResource = false;
      this.showUploadFiles = true;
    }

  }

  cloudinaryUpload() {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/auto/upload`,
      autoUpload: false, // Cargar archivos automáticamente al agregarlos a la cola de carga
      isHTML5: true, // Use xhrTransport a favor de iframeTransport
      removeAfterUpload: true, // Calcule el progreso de forma independiente para cada archivo cargado
      headers: [ // XHR request headers
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest',

        }
      ],

    };



    const upsertResponse = fileItem => {
      // Check if HTTP request was successful
      if (fileItem.status !== 200) {
        return false;
      }

      this.fileCloudinary = new CloudinaryResource();

      this.resourceList = fileItem;

      this.fileCloudinary.id = fileItem.data.asset_id;
      this.fileCloudinary.name = fileItem.file.name;
      this.fileCloudinary.public_id = fileItem.data.public_id;
      this.fileCloudinary.url = fileItem.data.url;
      this.fileCloudinary.secureUrl = fileItem.data.secure_url;
      this.fileCloudinary.size = fileItem.file.size;
      this.fileCloudinary.type = fileItem.file.type;
      this.fileCloudinary.duracion = fileItem.data.duration;
      this.fileCloudinary.format = fileItem.data.format;

      //enviandolo al componente principal
      this.uploadedResource.emit(this.fileCloudinary);
    }

    this.uploader = new FileUploader(uploaderOptions);


    // const deleteimage = async () => {
    //   return await this.cloudinary.config().destroy(
    //     "folder/mrobompy9ci9xawtmvcv",
    //     { invalidate: true, resource_type: "raw" },
    //     function(err, res) {
    //       if (err) {
    //         console.log(err);
    //         return res.status(400).json({
    //           ok: false,
    //           menssage: "Error deleting file",
    //           errors: err
    //         });
    //       }
    //       console.log(res);
    //     }
    //   );
    // }



    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Agregue el preajuste de carga sin firmar de Cloudinary al formulario de carga
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Usar el valor predeterminado "withCredentials" para las solicitudes CORS
      fileItem.withCredentials = false;
      console.log("CORS" + fileItem.withCredentials);

      return { fileItem, form };

    }

    // Actualizar el modelo al finalizar la carga de un archivo
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      upsertResponse(
        {
          file: item.file, status,
          data: JSON.parse(response),

        }
      )

    //console.log(upsertResponse);
  };  // FIN CLOUDINARY UPLOAD





  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  showUploadFileComponent() {

    this.cloudinaryUpload();
    this.uploader.clearQueue();
    this.showDialog();
  }
  onlyUploadFileComponent() {

    this.cloudinaryUpload();
    this.uploader.clearQueue();
    // this.showDialog();
  }

  showDialog() {
    this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  reset() {
    this.cloudinaryUpload();
  }

}

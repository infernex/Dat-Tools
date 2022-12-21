import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppHandlerService } from "./services.api";
import { Cloudinary } from '@cloudinary/angular-5.x';

@Injectable()

export class UploadImgServices {


    constructor(private http: HttpClient, private appSrv: AppHandlerService, private cloudinary: Cloudinary) {


    }

    createBlog(val: any): Observable<any> {
        let data = val;
        return this.http.post('https://api.cloudinary.com/v1_1/djokqylda/image/upload', data);
    }




}
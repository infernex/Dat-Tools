import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { ShareButtonsComponent } from './share-buttons/share-buttons.component';
import { ShareButtonsModule } from '@ngx-share/buttons';

import { WelcomeUserComponent } from '../pages/notifications/welcome-user/welcome-user.component';

// import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
// import { CourseFileComponent } from '../pages/course/course-file/course-file.component';

// import { CourseNoticeComponent } from '../pages/course-notice/course-notice.component';
// import { EditCourseNoticeComponent } from '../pages/course-notice/edit-course-notice/edit-course-notice.component';


import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';

import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ScrollPanelModule } from 'primeng/scrollpanel';


import { CloudinaryModule, CloudinaryConfiguration, provideCloudinary } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { CloudinarySettings } from '../settings';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FileUploadModule } from 'ng2-file-upload';
import { LoadingComponent } from './loading/loading.component';
// import { PaymentMethodComponent } from './payment-method/payment-method.component';

import { NgxPayPalModule } from 'ngx-paypal';
// import { AdComponent } from './ads/ad/ad.component';

import { CarouselModule } from "primeng/carousel";
// import { EditDatLiveComponent } from 'app/pages/live-dat/edit-dat-live/edit-dat-live.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { CourseStudentFileComponent } from 'app/pages/course/course-student-file/course-student-file.component';

export const cloudinaryLib = {
  Cloudinary: Cloudinary
};

@NgModule({
  declarations: [
    // ShareButtonsComponent,
    WelcomeUserComponent,
    // PageNotFoundComponent,
    // UploadFileComponent, LoadingComponent, PaymentMethodComponent, AdComponent,
    // EditDatLiveComponent,
    UploadFileComponent,
    // CourseFileComponent,
    // CourseNoticeComponent,
    // EditCourseNoticeComponent,
    //CourseStudentFileComponent
    LoadingComponent
  ],
  exports: [
    // ShareButtonsComponent,
    WelcomeUserComponent,
    // PageNotFoundComponent,
    UploadFileComponent,
    LoadingComponent,
    // PaymentMethodComponent,
    // AdComponent,
    // EditDatLiveComponent,
    // CourseFileComponent,
    // CourseNoticeComponent,
    // EditCourseNoticeComponent,
    // CourseStudentFileComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    SplitButtonModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    //NgbModule,
    ReactiveFormsModule,
    //vincular cloudinary con nuestro proyecto
    CloudinaryModule.forRoot(cloudinaryLib, CloudinarySettings),
    FileUploadModule,
    NgxPayPalModule,
    CarouselModule,
    ConfirmDialogModule,
    CalendarModule,
    ScrollPanelModule,

    ShareButtonsModule.withConfig({
      include: ['facebook', 'twitter', 'whatsapp', 'linkedin', 'email', 'copy'],
      debug: true
    })
  ]
})
export class SharedModule { }

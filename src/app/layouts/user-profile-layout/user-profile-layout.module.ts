import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserProfileLayoutRoutingModule } from './user-profile-layout-routing.module';

import { UserProfileComponent } from 'app/pages/user/user-profile/user-profile.component';

import { EditUserProfileComponent } from '../../pages/user/edit-user-profile/edit-user-profile.component';
import { ChangePwdComponent } from '../../pages/user/change-pwd/change-pwd.component';
// import { EditUserProfileComponent } from '../../pages/user-profile/edit-user-profile/edit-user-profile.component';
// import { ChangePwdComponent } from '../../pages/user-profile/change-pwd/change-pwd.component';
// import { MyCoursesComponent } from '../../pages/user-profile/my-courses/my-courses.component';
// import { CertificateComponent } from '../../pages/user-profile/certificate/certificate.component';
// import { StatisticsComponent } from '../../pages/user-profile/statistics/statistics.component';

import { SharedModule } from '../../shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ProgressBarModule } from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
//import { ChartsModule } from 'ng2-charts';
import { UserProfileLayoutComponent } from './user-profile-layout.component';



@NgModule({
  declarations: [
    
    UserProfileComponent,
    // MyCoursesComponent,
    EditUserProfileComponent,
    // CertificateComponent,
    ChangePwdComponent],
  // StatisticsComponent],
  imports: [
    CommonModule,

    SharedModule,
    ConfirmDialogModule,
    ProgressBarModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    UserProfileLayoutRoutingModule,

    //ChartsModule
  ]
})
export class UserProfileLayoutModule { }

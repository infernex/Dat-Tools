import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from 'app/pages/user/user-profile/user-profile.component';
import { UserProfileLayoutComponent } from './user-profile-layout.component';
// import { MyCoursesComponent } from 'app/pages/user-profile/my-courses/my-courses.component';
import { EditUserProfileComponent } from 'app/pages/user/edit-user-profile/edit-user-profile.component';
import { ChangePwdComponent } from 'app/pages/user/change-pwd/change-pwd.component';
import { AuthGuard } from 'app/shared/guards/auth.guard';
// import { CertificateComponent } from 'app/pages/user-profile/certificate/certificate.component';
// import { StatisticsComponent } from 'app/pages/user-profile/statistics/statistics.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'full',
  },
  { path: 'general', component: UserProfileComponent, canActivate: [AuthGuard] },

  { path: 'edit-profile', component: EditUserProfileComponent, canActivate: [AuthGuard] },
  { path: 'change-pwd', component: ChangePwdComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'my-courses', component: MyCoursesComponent, canActivate: [AuthGuard] 

  // },
  // {
  //   path: 'certificate/:certificateId' , component: CertificateComponent,

  // },

  // { path: 'statistics', component: StatisticsComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileLayoutRoutingModule { }

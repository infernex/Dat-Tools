import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/user/login/login.component';

import { RegistrationComponent } from './pages/user/registration/registration.component';
import { TermsComponent } from './pages/policies-dat/terms/terms.component';
import { PrivacyComponent } from './pages/policies-dat/privacy/privacy.component';
import { UserProfileLayoutComponent } from './layouts/user-profile-layout/user-profile-layout.component';
import { PortafolioComponent } from './portafolio/portafolio.component';



export const AppRoutes: Routes = [
  {

    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
      },

      {
        path: 'profile',
        component: UserProfileLayoutComponent,
        children: [
          {
            path: '',
            loadChildren: () => import('./layouts/user-profile-layout/user-profile-layout.module').then(x => x.UserProfileLayoutModule)
            // () => import('./layouts/user-profile-layout/user-profile-layout.module').then(x => x.UserProfileLayoutModule)
          }]
      },]
  },
  // {
  //   path: '**',
  //   redirectTo: 'dashboard'
  // },

  // {
  //   path: '', component: HomeComponent,
  //   children: [
  //     {
  //       path: '', component: LandingPageComponent
  //     },
  //     {
  //       path: 'dashboard', component: PortafolioComponent,

  //     },

  //     {
  //       path: 'profile',
  //       component: UserProfileLayoutComponent,
  //       children: [
  //         {
  //           path: '',
  //           loadChildren: () => import('./layouts/user-profile-layout/user-profile-layout.module').then(x => x.UserProfileLayoutModule)
  //           // () => import('./layouts/user-profile-layout/user-profile-layout.module').then(x => x.UserProfileLayoutModule)
  //         }]
  //     },
  //     {
  //       path: 'terms', component: TermsComponent,

  //     },

  //     {
  //       path: 'privacy', component: PrivacyComponent,
  //     },
  //   ]
  // },

  {
    path: 'login', component: LoginComponent

  },

  {
    path: 'registration', component: RegistrationComponent
  },


  {
    path: 'landing',
    redirectTo: 'landing-page',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },


  // {
  //   path: 'terms', component: TermsComponent,

  // },

  // {
  //   path: 'privacy', component: PrivacyComponent,
  // },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

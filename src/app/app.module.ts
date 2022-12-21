import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { CommonModule } from '@angular/common'

import { AppRoutes } from './app.routing';


import { AppComponent } from './app.component';

import { AuthInterceptor } from '../app/shared/guards/auth.interceptor';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SharedModule } from './shared/shared.module';

import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';


//primeng
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';

// import { HomeComponent } from './pages/home/home.component';
// import { FilterCoursePipe } from './pipes/filter-course.pipe';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { EditorModule } from 'primeng/editor';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { TreeModule } from 'primeng/tree';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';

import { SplitButtonModule } from 'primeng/splitbutton';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { TableModule } from 'primeng/table';


import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { DndModule } from 'ngx-drag-drop';
import { BlockUIModule } from 'primeng/blockui';


import { CarouselModule } from "primeng/carousel";

// CLOUD
import { CloudinaryModule, CloudinaryConfiguration, provideCloudinary } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { CloudinarySettings } from '../app/settings';
// Cloudinary module
import { FileUploadModule } from 'ng2-file-upload';

// import { CodemirrorModule } from '@ctrl/ngx-codemirror';
//import { SidebarModule } from './sidebar/sidebar.module';
import { AdminLayoutRoutes } from './layouts/admin-layout/admin-layout.routing';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
// import { LoginComponent } from './pages/user-profile/login/login.component';
// import { ResetPwdComponent } from './pages/user-profile/reset-pwd/reset-pwd.component';
// import { RegistrationComponent } from './pages/user-profile/registration/registration.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ResetPwdComponent } from './pages/user/reset-pwd/reset-pwd.component';
import { RegistrationComponent } from './pages/user/registration/registration.component';
import { TermsComponent } from './pages/policies-dat/terms/terms.component';
import { PrivacyComponent } from './pages/policies-dat/privacy/privacy.component';
import { UserProfileLayoutComponent } from './layouts/user-profile-layout/user-profile-layout.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { VisorInfoComponent } from './visor-info/visor-info.component';
import { BannerSuscripcionComponent } from './banner-suscripcion/banner-suscripcion.component';
import { UserComponent } from 'app/pages/user/user.component';
import { ComponentsModule } from './components/components.module';
import { EditDashboardComponent } from './edit-dashboard/edit-dashboard.component';


export const cloudinaryLib = {
  Cloudinary: Cloudinary
};
@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SharedModule,
    CardModule,
    StepsModule,
    CheckboxModule,
    ReactiveFormsModule,
    CalendarModule,
    ListboxModule,
    ScrollPanelModule,
    DropdownModule,

    ButtonModule,
    ProgressBarModule,
    DialogModule,
    ConfirmDialogModule,

    //vincular cloudinary con nuestro proyecto
    CloudinaryModule.forRoot(cloudinaryLib, CloudinarySettings),

    CodemirrorModule,
    FontAwesomeModule,
    DropdownModule,
    TabViewModule,
    PanelModule,
    TreeModule,
    MenubarModule,
    BlockUIModule,
    ToolbarModule,
    SplitButtonModule,
    VirtualScrollerModule,
    TableModule,
    ProgressSpinnerModule,
    MessagesModule,
    MultiSelectModule,
    DndModule,
    CarouselModule,
    EditorModule,

    FooterModule,
    //SidebarModule,
    NavbarModule,
    ComponentsModule,

    NgbModule,

    FileUploadModule,

    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserProfileLayoutComponent,
    HomeComponent,
    LandingPageComponent,
    LoginComponent,
    PortafolioComponent,
    RegistrationComponent,
    ResetPwdComponent,
    UserComponent,
    VisorInfoComponent,
    BannerSuscripcionComponent,

    TermsComponent,
    PrivacyComponent,
    EditDashboardComponent,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

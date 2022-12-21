import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@NgModule({

    exports: [
        NavbarComponent,
    ],
    imports: [RouterModule,
        CommonModule,
        NgbModule,
        DialogModule,
        ButtonModule,
        FormsModule
    ],
    declarations: [
        NavbarComponent,
    ],

})

export class NavbarModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';
import { ContentDatAnalyticsComponent } from '../../pages/content-dat-analytics/content-dat-analytics.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports:
        [RouterModule,
            CommonModule,
            SharedModule],
    declarations: [
        FooterComponent,
        // ContentDatAnalyticsComponent
    ],
    exports: [FooterComponent]
})

export class FooterModule { }

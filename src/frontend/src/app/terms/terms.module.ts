import {NgModule}       from '@angular/core';

import {TermsRoutingModule} from './terms-routing.module';
import {TermsComponent} from './terms.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    TermsRoutingModule,
    FormsModule,
    CommonModule
  ],
  declarations: [TermsComponent]
})
export class TermsModule {
}

import {NgModule}       from '@angular/core';

import {TopicsRoutingModule} from './topics-routing.module';
import {TopicsComponent} from './topics.component';
import { ChartsModule } from 'ng2-charts';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    TopicsRoutingModule,
    ChartsModule,
    FormsModule,
    CommonModule
  ],
  declarations: [TopicsComponent]
})
export class TopicsModule {
}

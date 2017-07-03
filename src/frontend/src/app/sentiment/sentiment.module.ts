import {NgModule}       from '@angular/core';

import {SentimentRoutingModule} from './sentiment-routing.module';
import {SentimentComponent} from './sentiment.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  imports: [
    SentimentRoutingModule,
    ChartsModule,
    FormsModule,
    CommonModule
  ],
  declarations: [SentimentComponent]
})
export class SentimentModule {
}

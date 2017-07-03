import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SentimentComponent}   from './sentiment.component';


const sentimentRoutes: Routes = [
  {
    path: '',
    component: SentimentComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(sentimentRoutes)],
  exports: [RouterModule]
})
export class SentimentRoutingModule {
}

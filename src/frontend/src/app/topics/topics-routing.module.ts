import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TopicsComponent}   from './topics.component';


const topicsRoutes: Routes = [
  {
    path: '',
    component: TopicsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(topicsRoutes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule {
}

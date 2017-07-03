import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InformationComponent}   from './information.component';


const informationRoutes: Routes = [
  {
    path: '',
    component: InformationComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(informationRoutes)],
  exports: [RouterModule]
})
export class InformationRoutingModule {
}

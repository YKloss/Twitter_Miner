import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
    {
        path: 'terms',
        loadChildren: 'app/terms/terms.module#TermsModule'
    },
    {
        path: 'sentiment',
        loadChildren: 'app/sentiment/sentiment.module#SentimentModule'
    },
    {
        path: 'topics',
        loadChildren: 'app/topics/topics.module#TopicsModule'
    },
    {
        path: 'information',
        loadChildren: 'app/information/information.module#InformationModule'
    },
    {
        path: '',
        redirectTo: '/terms',
        pathMatch: 'full'
    }
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

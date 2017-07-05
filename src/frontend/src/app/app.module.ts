import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
// import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http';
import {TweetService} from './tweet.service';
import { FormsModule } from '@angular/forms';

import {ChartsModule} from 'ng2-charts';
import {SentimentComponent} from './sentiment.component';
import {ControlComponent} from './control.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
// import {AppRoutingModule} from "./app-routing.module";

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
    imports: [
        BrowserModule,
        // AppRoutingModule,
        HttpModule,
        FormsModule,
        ChartsModule,
        SocketIoModule.forRoot(config)
    ],
    declarations: [AppComponent,
      SentimentComponent,
      ControlComponent
    ],
    providers: [TweetService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {InformationModule} from './information/information.module';
import {TermsModule} from './terms/terms.module';
import {SentimentModule} from './sentiment/sentiment.module';
import {TopicsModule} from './topics/topics.module';
import {HttpModule} from '@angular/http';
import {TweetService} from './tweet.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        TermsModule,
        SentimentModule,
        TopicsModule,
        InformationModule,
        HttpModule,
        FormsModule],
    declarations: [AppComponent],
    providers: [TweetService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

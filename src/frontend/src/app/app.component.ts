import {AfterViewInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {TweetService} from './tweet.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
    hashtagInput: string;
    itemsInput: number;
    hashtag: string;
    showSpinner = false;

    constructor(router: Router, private tweetService: TweetService) {
    }

    ngAfterViewInit() {
        this.hashtag = this.tweetService.getLastKnownHashtag();

        /* Subscribe to selection emitter */
        this.tweetService.hashtag$.subscribe(hashtag => {
            this.hashtag = hashtag;
        });
    }


    getNewTweets() {
        this.showSpinner = true;
        console.log('getting tweets...');
        this.tweetService.getTweets(this.hashtagInput, this.itemsInput)
            .then(response => {
                this.showSpinner = false;
                console.log('getTweets response: ' + JSON.stringify(response, null, 2));
                // let jsonObj = JSON.parse(response);
                // console.log(jsonObj);
                this.tweetService.announceNewHashtag(response['hashtag']);
            });
    }
}


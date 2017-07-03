import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TweetService} from './tweet.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    hashtagInput: string;
    itemsInput: number;
    hashtag: string;
    showSpinner = false;

    constructor(router: Router, private tweetService: TweetService) {
    }

    ngOnInit() {
      this.tweetService
        .getDataResponse()
        .subscribe(msg => {
          this.tweetService.announceNewData(msg);
        });

      this.hashtag = this.tweetService.getLastKnownHashtag();

      /* Subscribe to selection emitter */
      this.tweetService.hashtag$.subscribe(hashtag => {
        this.hashtag = hashtag;
      });
    }

    getNewTweets() {
        this.showSpinner = true;
        let request_obj: any = {'hashtag': this.hashtagInput, 'number_of_tweets': Number(this.itemsInput)};

        console.log('getting tweets...');

        this.tweetService.sendDataRequest(<JSON>request_obj);
    }
}


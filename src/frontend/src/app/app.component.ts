import { Component, OnInit} from '@angular/core';
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

    constructor(private tweetService: TweetService) {
    }

    ngOnInit() {
      this.tweetService
        .getDataResponse()
        .subscribe(msg => {
          console.log(JSON.stringify(msg, null, 2));
          this.tweetService.announceNewData(msg);
          this.tweetService.announceNewHashtag(this.hashtagInput);
          this.showSpinner = false;
        });

      this.hashtag = this.tweetService.getLastKnownHashtag();

      /* Subscribe to selection emitter */
      this.tweetService.hashtag$.subscribe(hashtag => {
        this.hashtag = hashtag;
      });
    }

    getNewTweets() {
        this.showSpinner = true;
        let id = this.tweetService.getCurrentId() + 1;
        this.tweetService.setCurrentId(id);
        let request_obj = {'id': id, 'hashtag': this.hashtagInput, 'number_of_tweets': Number(this.itemsInput)};

        console.log('getting tweets...');

        this.tweetService.sendDataRequest(JSON.stringify(request_obj));
    }
}


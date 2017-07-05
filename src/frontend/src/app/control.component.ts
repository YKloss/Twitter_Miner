import {Component, OnInit} from '@angular/core';
import {TweetService} from './tweet.service';
import {Tweet} from './tweet';

@Component({
  selector: 'control-pane',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  // showSpinner = false;
  tweets: Tweet[];
  selectedTweet: Tweet;
  hashtag: string;
  hashtagSelected = false;


  constructor(private tweetService: TweetService) {
  }

  ngOnInit() {
    // this.tweets = this.tweetService.getLastKnownData().tweets;
    let data = this.tweetService.getLastKnownData();
    this.hashtag = this.tweetService.getLastKnownHashtag();
    if (data !== undefined) {
      this.tweets = data.tweets;
    }

    /* Subscribe to selection emitter */
    this.tweetService.data$.subscribe(msg => {
      this.tweets = msg.tweets;
    });

    this.tweetService.hashtag$.subscribe(hashtag => {
      this.hashtag = hashtag;
    });
  }

  onSelectTweet(tweet: Tweet): void {
    this.hashtagSelected = false;
    this.selectedTweet = tweet;
    console.log('tweet selected: ' + tweet.author);
    this.tweetService.announceSelectedTweet(tweet);
  }

  onSelectAllTweets(): void {
    this.hashtagSelected = true;
    this.selectedTweet = null;
    this.tweetService.announceShowTweetOverview(1);
  }
}


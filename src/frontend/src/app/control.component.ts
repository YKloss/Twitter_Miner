import {Component, OnInit} from '@angular/core';
import {TweetService} from './tweet.service';

@Component({
  selector: 'control-pane',
  templateUrl: './control.component.html',
})
export class ControlComponent implements OnInit {
  showSpinner = false;
  data: string = '';


  constructor(private tweetService: TweetService) {
  }

  ngOnInit() {
    this.data = this.tweetService.getLastKnownData();

    /* Subscribe to selection emitter */
    this.tweetService.data$.subscribe(data => {
      this.data = data;
    });
  }
}


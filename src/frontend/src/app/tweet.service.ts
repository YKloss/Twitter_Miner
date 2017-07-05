import {Injectable}    from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';
import {Socket} from 'ng-socket-io';
import {Tweet} from "./tweet";

@Injectable()
export class TweetService {

  private lastKnownHashtag: any;
  private lastKnownData: any;
  private lastKnownSelectedTweet: any;

  // Observable string sources
  private hashtagSource = new Subject<any>();
  private dataSource = new Subject<any>();
  private selectedTweetSource = new Subject<any>();
  private showTweetOverviewSource = new Subject<any>();

  // Observable string streams
  hashtag$ = this.hashtagSource.asObservable();
  data$ = this.dataSource.asObservable();
  selectedTweet$ = this.selectedTweetSource.asObservable();
  showTweetOverview$ = this.showTweetOverviewSource.asObservable();

  // Service message commands
  announceNewHashtag(newHashtag: string) {
    this.lastKnownHashtag = newHashtag;
    this.hashtagSource.next(newHashtag);
  }

  announceNewData(newData: string) {
    this.lastKnownData = newData;
    this.dataSource.next(newData);
  }

  announceSelectedTweet(tweet: Tweet) {
    this.lastKnownSelectedTweet = tweet;
    this.selectedTweetSource.next(tweet);
  }

  announceShowTweetOverview(msg: any) {
    this.showTweetOverviewSource.next(msg);
  }

  constructor(private socket: Socket, private http: Http) {
  }

  sendDataRequest(msg: string) {
    console.log('emit data_request...');
    this.socket.emit('data_request', msg);
  }

  getDataResponse() {
    return this.socket
      .fromEvent<any>('data_response');
    // .map(data => data.data);
  }


  getLastKnownHashtag(): any {
    return this.lastKnownHashtag;
  }

  getLastKnownData(): any {
    return this.lastKnownData;
  }

  getLastKnownSelectedTweet(): any {
    return this.lastKnownSelectedTweet;
  }
}

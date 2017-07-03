import {Injectable}    from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';
import {Socket} from 'ng2-socket-io';

@Injectable()
export class TweetService {

  private lastKnownHashtag: any;
  private lastKnownData: any;

  // Observable string sources
  private hashtagSource = new Subject<any>();
  private dataSource = new Subject<any>();

  // Observable string streams
  hashtag$ = this.hashtagSource.asObservable();
  data$ = this.dataSource.asObservable();

  // Service message commands
  announceNewHashtag(newHashtag: string) {
    this.lastKnownHashtag = newHashtag;
    this.hashtagSource.next(newHashtag);
  }

  announceNewData(newData: string) {
    this.lastKnownData = newData;
    this.dataSource.next(newData);
  }

  //
  //
  constructor(private socket: Socket, private http: Http) {
  }

  sendDataRequest(msg: JSON) {
    this.socket.emit('data_request', msg);
  }

  getDataResponse() {
    return this.socket
      .fromEvent('data_response')
      .map((data: Response) => data.json().msg);
  }

  // saveTermsState(termsState: any) {
  //     this.termsState = termsState;
  // }
  //
  // getTermsState() {
  //     return this.termsState;
  // }
  //
  // saveTopicsState(topicsState: any) {
  //     this.topicsState = topicsState;
  // }
  //
  // getTopicsState() {
  //     return this.topicsState;
  // }
  //
  //
  getLastKnownHashtag(): any {
    return this.lastKnownHashtag;
  }

  getLastKnownData(): any {
    return this.lastKnownData;
  }

  // getTweets(hashtag: string, items: number): Promise<string> {
  //     let params = new URLSearchParams();
  //
  //     params.append('hashtag', hashtag);
  //     params.append('items', items.toLocaleString());
  //
  //     return this.http.get(this.tweetsUrl, {search: params})
  //         .toPromise()
  //         .then(response => {
  //             return response.json();
  //         });
  // }
  //
  // getTerms(hashtag: string, occurence: string, normalization: boolean, ngrams: string): Promise<string> {
  //     let params = new URLSearchParams();
  //
  //     params.append('hashtag', hashtag);
  //     params.append('occurence', occurence);
  //     params.append('normalization', String(normalization));
  //     params.append('ngrams', ngrams);
  //
  //     return this.http.get(this.termsUrl, {search: params})
  //         .toPromise()
  //         .then(response => {
  //             return response.json();
  //         });
  // }
  //
  // getTopics(hashtag: string, occurence: string, normalization: boolean, ngrams: string, topics: number,
  //           datapoints: number): Promise<string> {
  //     let params = new URLSearchParams();
  //
  //     params.append('hashtag', hashtag);
  //     params.append('occurence', occurence);
  //     params.append('normalization', String(normalization));
  //     params.append('ngrams', ngrams);
  //     params.append('topics', String(topics));
  //     params.append('datapoints', String(datapoints));
  //
  //     return this.http.get(this.topicsUrl, {search: params})
  //         .toPromise()
  //         .then(response => {
  //             return response.json();
  //         });
  // }
  //
  // getSentiment(hashtag: string, occurence: string, normalization: boolean, ngrams: string,
  //              datapoints: number): Promise<string> {
  //     let params = new URLSearchParams();
  //
  //     params.append('hashtag', hashtag);
  //     params.append('occurence', occurence);
  //     params.append('normalization', String(normalization));
  //     params.append('ngrams', ngrams);
  //     params.append('datapoints', String(datapoints));
  //
  //     return this.http.get(this.sentimentUrl, {search: params})
  //         .toPromise()
  //         .then(response => {
  //             return response.json();
  //         });
  // }
}

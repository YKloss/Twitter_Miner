import {Injectable}    from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class TweetService {



    // private tweetsUrl = 'http://127.0.0.1:5000/api/tweets';
    // private termsUrl = 'http://127.0.0.1:5000/api/terms';
    // private topicsUrl = 'http://127.0.0.1:5000/api/topics';
    // private sentimentUrl = 'http://127.0.0.1:5000/api/sentiment';
    //
    // private lastKnownHashtag: any;
    //
    // // Observable string sources
    // private hashtagSource = new Subject<any>();
    //
    //
    // // Observable string streams
    // hashtag$ = this.hashtagSource.asObservable();
    //
    // // Objects to save
    // private sentimentState: any;
    // private termsState: any;
    // private topicsState: any;
    //
    //
    // // Service message commands
    // announceNewHashtag(newHashtag: string) {
    //     this.lastKnownHashtag = newHashtag;
    //     this.hashtagSource.next(newHashtag);
    // }
    //
    //
    // constructor(private http: Http) {
    // }
    //
    // saveSentimentState(sentimentState: any) {
    //     this.sentimentState = sentimentState;
    // }
    //
    // getSentimentState() {
    //     return this.sentimentState;
    // }
    //
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
    // getLastKnownHashtag(): any {
    //     return this.lastKnownHashtag;
    // }
    //
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

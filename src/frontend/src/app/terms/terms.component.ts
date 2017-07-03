import {AfterViewInit, Component} from '@angular/core';
import {TweetService} from '../tweet.service';
declare const jQuery: any;
declare const jQCloud: any;

@Component({
    templateUrl: './terms.component.html',
})
export class TermsComponent implements AfterViewInit {
    showSpinner = false;
    hashtag: string;
    occurence: string;
    normalization: boolean;
    ngrams: string;
    words: any = [];

    constructor(private tweetService: TweetService) {
    }

    ngAfterViewInit() {
        this.hashtag = this.tweetService.getLastKnownHashtag();

        /* Subscribe to selection emitter */
        this.tweetService.hashtag$.subscribe(hashtag => {
            this.hashtag = hashtag;
        });

        this.computeResponse(this.tweetService.getTermsState());
    }

    getTermData() {
        console.log('hashtag: ' + this.hashtag);
        console.log('occurence: ' + this.occurence);
        console.log('normalization: ' + this.normalization);
        console.log('ngrams: ' + this.ngrams);

        if (this.occurence === undefined) {
            console.log('No occurence selected!');
            return;
        }
        if (this.normalization === undefined) {
            this.normalization = false;
        }
        if (this.ngrams === undefined) {
            console.log('No ngrams selected!');
            return;
        }

        jQuery('#keywords').empty();
        this.showSpinner = true;

        this.tweetService.getTerms(this.hashtag, this.occurence, this.normalization, this.ngrams)
            .then(response => {
                console.log('getTerms response: ' + JSON.stringify(response, null, 2));

                this.showSpinner = false;
                this.tweetService.saveTermsState(response);
                this.computeResponse(response);
            });
    }

    private computeResponse(response: any) {
        if (response === undefined) {
            return;
        }

        jQuery('#keywords').empty();
        jQuery('#keywords').jQCloud(response, {
            height: 400,
            autoResize: true
        });
    }


}

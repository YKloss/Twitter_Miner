import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {TweetService} from '../tweet.service';
import {BaseChartDirective} from 'ng2-charts';


@Component({
    templateUrl: './sentiment.component.html',
    styles: [`
        .chart {
            display: block;
        }
    `]
})
export class SentimentComponent implements AfterViewInit {
    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective;

    showSpinner = false;
    rerender = true;
    hashtag: string;
    occurence: string;
    normalization: boolean;
    ngrams: string;
    datapoints: number;

    datasets: any = [];
    labels: any = [];
    overallSentiment: string = '';

    options = {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    format: 'MM/DD/YYYY HH:mm',
                    // round: 'day'
                    // tooltipFormat: 'll HH:mm',
                    displayFormats: {
                        'millisecond': 'MMM DD HH:mm',
                        'second': 'MMM DD HH:mm',
                        'minute': 'MMM DD HH:mm',
                        'hour': 'MMM DD HH:mm',
                        'day': 'MMM DD HH:mm',
                        'week': 'MMM DD HH:mm',
                        'month': 'MMM DD HH:mm',
                        'quarter': 'MMM DD HH:mm',
                        'year': 'MMM DD HH:mm',
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }, ],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };


    constructor(private tweetService: TweetService, private cdRef: ChangeDetectorRef) {
    }

    doRerender() {
        this.rerender = false;
        this.cdRef.detectChanges();
        this.rerender = true;
    }


    ngAfterViewInit() {
        this.hashtag = this.tweetService.getLastKnownHashtag();

        /* Subscribe to selection emitter */
        this.tweetService.hashtag$.subscribe(hashtag => {
            this.hashtag = hashtag;
        });

        this.computeResponse(this.tweetService.getSentimentState());
    }

    getSentimentData() {
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
        if (this.datapoints === undefined) {
            console.log('No datapoints number selected!');
            return;
        }
        this.datasets = [];
        this.labels = [];
        this.showSpinner = true;
        this.doRerender();

        this.tweetService.getSentiment(this.hashtag, this.occurence, this.normalization, this.ngrams, this.datapoints)
            .then(response => {
                console.log('getTopics response: ' + JSON.stringify(response, null, 2));

                this.showSpinner = false;
                this.tweetService.saveSentimentState(response);
                this.computeResponse(response);
            });

    }

    private computeResponse(response: any) {
        if (response === undefined) {
            return;
        }
        this.overallSentiment = response['overall'];

        this.datasets = [];
        this.labels = [];
        this.datasets = response['intervals']['dataset'];
        let labels = [];
        for (let label of response['intervals']['labels']) {
            let date = new Date(label);
            labels.push(date);
        }
        this.labels = labels;


        this.doRerender();
    }

}

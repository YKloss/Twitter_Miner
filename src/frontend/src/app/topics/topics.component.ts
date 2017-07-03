import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {TweetService} from '../tweet.service';
import {BaseChartDirective} from 'ng2-charts';

@Component({
    templateUrl: './topics.component.html',
    styles: [`
        .chart {
            display: block;
        }
    `]
})
export class TopicsComponent implements AfterViewInit {
    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective;

    showSpinner = false;

    table_lables: any[];
    table_rows: any[];

    rerender = true;
    hashtag: string;
    occurence: string;
    normalization: boolean;
    ngrams: string;
    topics: number;
    datapoints: number;

    datasets: any = [];
    labels: any = [];

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

        this.computeResponse(this.tweetService.getTopicsState());
    }

    getTopicsData() {
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
        if (this.topics === undefined) {
            console.log('No topics number selected!');
            return;
        }
        if (this.datapoints === undefined) {
            console.log('No datapoints number selected!');
            return;
        }

        this.datasets = [];
        this.labels = [];
        this.showSpinner = true;
        this.table_lables = []
        this.table_rows = [];

        this.doRerender();

        this.tweetService.getTopics(this.hashtag, this.occurence, this.normalization, this.ngrams, this.topics, this.datapoints)
            .then(response => {
                console.log('getTopics response: ' + JSON.stringify(response, null, 2));

                this.showSpinner = false;

                this.tweetService.saveTopicsState(response);
                this.computeResponse(response);
            });

    }

    private computeResponse(response: any) {
        if (response === undefined) {
            return;
        }

        this.datasets = [];
        this.labels = [];
        this.datasets = response['intervals']['dataset'];
        let labels = [];
        for (let label of response['intervals']['labels']) {
            let date = new Date(label);
            labels.push(date);
        }
        this.labels = labels;
        // this.chart.chart.update();
        // this.forceChartRefresh();
        // this.updateChart();
        let topic_labels = [];
        let rows = [];
        let number_of_terms = 0;
        for (let topic of response['topics']) {
            topic_labels.push(topic['topic']);
            number_of_terms = topic['terms'].length;
        }

        for (let i = 0; i < number_of_terms; i++) {
            let temp = [];
            for (let topic of response['topics']) {
                temp.push(topic['terms'][i]);
            }
            rows.push(temp);
        }

        this.table_lables = topic_labels;
        this.table_rows = rows;


        this.doRerender();
    }

}

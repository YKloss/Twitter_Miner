import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {TweetService} from './tweet.service';
import {BaseChartDirective} from 'ng2-charts';
import {Tweet} from "./tweet";


@Component({
  selector: 'data-pane',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
  styles: [`
    .chart {
      display: block;
    }
  `]
})
export class SentimentComponent implements AfterViewInit {
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  data: any;
  showTweet = false;
  selectedTweet: string;
  showSpinner = false;
  rerender = true;
  hashtag: string;
  occurence: string;
  normalization: boolean;
  ngrams: string;
  datapoints: number;

  datasets: any = [];
  labels: any = [];
  overallSentimentBayes: string = '';
  overallSentimentSvm: string = '';
  overallSentimentTree: string = '';

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
      },],
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
    this.selectedTweet = this.tweetService.getLastKnownSelectedTweet();

    /* Subscribe to selection emitter */
    this.tweetService.selectedTweet$.subscribe(tweet => {
      this.selectedTweet = tweet;
      this.showTweet = true;
    });

    this.tweetService.showTweetOverview$.subscribe(msg => {
      this.showTweet = false;
      this.computeGraphData(this.data);
    });

    this.tweetService.data$.subscribe(data => {
      this.data = data;
      // this.computeGraphData(this.data);
    });

    // this.computeGraphData(this.data);
  }

  private computeGraphData(response: any) {
    if (response === undefined) {
      return;
    }
    console.log(JSON.stringify(response, null, 2));
    this.overallSentimentBayes = response['overall_sentiment']['bayes'];
    this.overallSentimentSvm = response['overall_sentiment']['svm'];
    this.overallSentimentTree = response['overall_sentiment']['tree'];

    this.datasets = [];
    this.labels = [];
    this.datasets = response['graph_data']['dataset'];
    let labels = [];
    for (let label of response['graph_data']['labels']) {
      let date = new Date(label);
      labels.push(date);
    }
    this.labels = labels;


    this.doRerender();
  }

}

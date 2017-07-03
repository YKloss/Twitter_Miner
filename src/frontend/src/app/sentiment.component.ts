import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {TweetService} from './tweet.service';
import {BaseChartDirective} from 'ng2-charts';


@Component({
  selector: 'data-pane',
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

  data: string;
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
    this.data = this.tweetService.getLastKnownData();

    /* Subscribe to selection emitter */
    this.tweetService.hashtag$.subscribe(data => {
      this.data = data;
    });

    this.computeResponse(this.data);
  }

  private computeResponse(response: any) {
    if (response === undefined) {
      return;
    }
    // this.overallSentiment = response['overall'];
    //
    // this.datasets = [];
    // this.labels = [];
    // this.datasets = response['intervals']['dataset'];
    // let labels = [];
    // for (let label of response['intervals']['labels']) {
    //   let date = new Date(label);
    //   labels.push(date);
    // }
    // this.labels = labels;


    this.doRerender();
  }

}

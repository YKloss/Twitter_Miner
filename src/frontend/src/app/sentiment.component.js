"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var tweet_service_1 = require("./tweet.service");
var ng2_charts_1 = require("ng2-charts");
var SentimentComponent = (function () {
    function SentimentComponent(tweetService, cdRef) {
        this.tweetService = tweetService;
        this.cdRef = cdRef;
        this.showTweet = false;
        this.showSpinner = false;
        this.rerender = true;
        this.datasets = [];
        this.labels = [];
        this.overallSentimentBayes = '';
        this.overallSentimentSvm = '';
        this.overallSentimentTree = '';
        this.options = {
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
    }
    SentimentComponent.prototype.doRerender = function () {
        this.rerender = false;
        this.cdRef.detectChanges();
        this.rerender = true;
    };
    SentimentComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.selectedTweet = this.tweetService.getLastKnownSelectedTweet();
        /* Subscribe to selection emitter */
        this.tweetService.selectedTweet$.subscribe(function (tweet) {
            _this.selectedTweet = tweet;
            _this.showTweet = true;
        });
        this.tweetService.showTweetOverview$.subscribe(function (msg) {
            _this.showTweet = false;
            _this.computeGraphData(_this.data);
        });
        this.tweetService.data$.subscribe(function (data) {
            if (data['id'] === _this.tweetService.getCurrentId()) {
                _this.data = data;
                _this.doRerender();
            }
            // this.computeGraphData(this.data);
        });
        // this.computeGraphData(this.data);
    };
    SentimentComponent.prototype.computeGraphData = function (response) {
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
        var labels = [];
        for (var _i = 0, _a = response['graph_data']['labels']; _i < _a.length; _i++) {
            var label = _a[_i];
            var date = new Date(label);
            labels.push(date);
        }
        this.labels = labels;
        this.doRerender();
    };
    return SentimentComponent;
}());
__decorate([
    core_1.ViewChild(ng2_charts_1.BaseChartDirective),
    __metadata("design:type", ng2_charts_1.BaseChartDirective)
], SentimentComponent.prototype, "chart", void 0);
SentimentComponent = __decorate([
    core_1.Component({
        selector: 'data-pane',
        templateUrl: './sentiment.component.html',
        styleUrls: ['./sentiment.component.css'],
        styles: ["\n    .chart {\n      display: block;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [tweet_service_1.TweetService, core_1.ChangeDetectorRef])
], SentimentComponent);
exports.SentimentComponent = SentimentComponent;
//# sourceMappingURL=sentiment.component.js.map
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
var tweet_service_1 = require("../tweet.service");
var ng2_charts_1 = require("ng2-charts");
var SentimentComponent = (function () {
    function SentimentComponent(tweetService, cdRef) {
        this.tweetService = tweetService;
        this.cdRef = cdRef;
        this.showSpinner = false;
        this.rerender = true;
        this.datasets = [];
        this.labels = [];
        this.overallSentiment = '';
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
        this.hashtag = this.tweetService.getLastKnownHashtag();
        /* Subscribe to selection emitter */
        this.tweetService.hashtag$.subscribe(function (hashtag) {
            _this.hashtag = hashtag;
        });
        this.computeResponse(this.tweetService.getSentimentState());
    };
    SentimentComponent.prototype.getSentimentData = function () {
        var _this = this;
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
            .then(function (response) {
            console.log('getTopics response: ' + JSON.stringify(response, null, 2));
            _this.showSpinner = false;
            _this.tweetService.saveSentimentState(response);
            _this.computeResponse(response);
        });
    };
    SentimentComponent.prototype.computeResponse = function (response) {
        if (response === undefined) {
            return;
        }
        this.overallSentiment = response['overall'];
        this.datasets = [];
        this.labels = [];
        this.datasets = response['intervals']['dataset'];
        var labels = [];
        for (var _i = 0, _a = response['intervals']['labels']; _i < _a.length; _i++) {
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
        templateUrl: './sentiment.component.html',
        styles: ["\n        .chart {\n            display: block;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [tweet_service_1.TweetService, core_1.ChangeDetectorRef])
], SentimentComponent);
exports.SentimentComponent = SentimentComponent;
//# sourceMappingURL=sentiment.component.js.map
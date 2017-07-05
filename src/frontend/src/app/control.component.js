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
var ControlComponent = (function () {
    function ControlComponent(tweetService) {
        this.tweetService = tweetService;
        this.hashtagSelected = false;
    }
    ControlComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.tweets = this.tweetService.getLastKnownData().tweets;
        var data = this.tweetService.getLastKnownData();
        this.hashtag = this.tweetService.getLastKnownHashtag();
        if (data !== undefined) {
            this.tweets = data.tweets;
        }
        /* Subscribe to selection emitter */
        this.tweetService.data$.subscribe(function (msg) {
            _this.tweets = msg.tweets;
        });
        this.tweetService.hashtag$.subscribe(function (hashtag) {
            _this.hashtag = hashtag;
        });
    };
    ControlComponent.prototype.onSelectTweet = function (tweet) {
        this.hashtagSelected = false;
        this.selectedTweet = tweet;
        console.log('tweet selected: ' + tweet.author);
        this.tweetService.announceSelectedTweet(tweet);
    };
    ControlComponent.prototype.onSelectAllTweets = function () {
        this.hashtagSelected = true;
        this.selectedTweet = null;
        this.tweetService.announceShowTweetOverview(1);
    };
    return ControlComponent;
}());
ControlComponent = __decorate([
    core_1.Component({
        selector: 'control-pane',
        templateUrl: './control.component.html',
        styleUrls: ['./control.component.css']
    }),
    __metadata("design:paramtypes", [tweet_service_1.TweetService])
], ControlComponent);
exports.ControlComponent = ControlComponent;
//# sourceMappingURL=control.component.js.map
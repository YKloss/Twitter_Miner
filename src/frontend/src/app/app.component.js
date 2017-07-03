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
var router_1 = require("@angular/router");
var tweet_service_1 = require("./tweet.service");
var AppComponent = (function () {
    function AppComponent(router, tweetService) {
        this.tweetService = tweetService;
        this.showSpinner = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tweetService
            .getDataResponse()
            .subscribe(function (msg) {
            _this.tweetService.announceNewData(msg);
        });
        this.hashtag = this.tweetService.getLastKnownHashtag();
        /* Subscribe to selection emitter */
        this.tweetService.hashtag$.subscribe(function (hashtag) {
            _this.hashtag = hashtag;
        });
    };
    AppComponent.prototype.getNewTweets = function () {
        this.showSpinner = true;
        var request_obj = { 'hashtag': this.hashtagInput, 'number_of_tweets': Number(this.itemsInput) };
        console.log('getting tweets...');
        this.tweetService.sendDataRequest(request_obj);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
    }),
    __metadata("design:paramtypes", [router_1.Router, tweet_service_1.TweetService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
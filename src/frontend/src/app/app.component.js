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
var AppComponent = (function () {
    function AppComponent(tweetService) {
        this.tweetService = tweetService;
        this.showSpinner = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tweetService
            .getDataResponse()
            .subscribe(function (msg) {
            console.log(JSON.stringify(msg, null, 2));
            _this.tweetService.announceNewData(msg);
            _this.tweetService.announceNewHashtag(_this.hashtagInput);
            _this.showSpinner = false;
        });
        this.hashtag = this.tweetService.getLastKnownHashtag();
        /* Subscribe to selection emitter */
        this.tweetService.hashtag$.subscribe(function (hashtag) {
            _this.hashtag = hashtag;
        });
    };
    AppComponent.prototype.getNewTweets = function () {
        this.showSpinner = true;
        var id = this.tweetService.getCurrentId() + 1;
        this.tweetService.setCurrentId(id);
        var request_obj = { 'id': id, 'hashtag': this.hashtagInput, 'number_of_tweets': Number(this.itemsInput) };
        console.log('getting tweets...');
        this.tweetService.sendDataRequest(JSON.stringify(request_obj));
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
    }),
    __metadata("design:paramtypes", [tweet_service_1.TweetService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
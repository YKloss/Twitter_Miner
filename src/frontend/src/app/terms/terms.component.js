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
var TermsComponent = (function () {
    function TermsComponent(tweetService) {
        this.tweetService = tweetService;
        this.showSpinner = false;
        this.words = [];
    }
    TermsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.hashtag = this.tweetService.getLastKnownHashtag();
        /* Subscribe to selection emitter */
        this.tweetService.hashtag$.subscribe(function (hashtag) {
            _this.hashtag = hashtag;
        });
        this.computeResponse(this.tweetService.getTermsState());
    };
    TermsComponent.prototype.getTermData = function () {
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
        jQuery('#keywords').empty();
        this.showSpinner = true;
        this.tweetService.getTerms(this.hashtag, this.occurence, this.normalization, this.ngrams)
            .then(function (response) {
            console.log('getTerms response: ' + JSON.stringify(response, null, 2));
            _this.showSpinner = false;
            _this.tweetService.saveTermsState(response);
            _this.computeResponse(response);
        });
    };
    TermsComponent.prototype.computeResponse = function (response) {
        if (response === undefined) {
            return;
        }
        jQuery('#keywords').empty();
        jQuery('#keywords').jQCloud(response, {
            height: 400,
            autoResize: true
        });
    };
    return TermsComponent;
}());
TermsComponent = __decorate([
    core_1.Component({
        templateUrl: './terms.component.html',
    }),
    __metadata("design:paramtypes", [tweet_service_1.TweetService])
], TermsComponent);
exports.TermsComponent = TermsComponent;
//# sourceMappingURL=terms.component.js.map
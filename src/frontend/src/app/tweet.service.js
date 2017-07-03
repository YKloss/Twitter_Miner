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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var Subject_1 = require("rxjs/Subject");
var ng2_socket_io_1 = require("ng2-socket-io");
var TweetService = (function () {
    //
    //
    function TweetService(socket, http) {
        this.socket = socket;
        this.http = http;
        // Observable string sources
        this.hashtagSource = new Subject_1.Subject();
        this.dataSource = new Subject_1.Subject();
        // Observable string streams
        this.hashtag$ = this.hashtagSource.asObservable();
        this.data$ = this.dataSource.asObservable();
    }
    // Service message commands
    TweetService.prototype.announceNewHashtag = function (newHashtag) {
        this.lastKnownHashtag = newHashtag;
        this.hashtagSource.next(newHashtag);
    };
    TweetService.prototype.announceNewData = function (newData) {
        this.lastKnownData = newData;
        this.dataSource.next(newData);
    };
    TweetService.prototype.sendDataRequest = function (msg) {
        this.socket.emit('data_request', msg);
    };
    TweetService.prototype.getDataResponse = function () {
        return this.socket
            .fromEvent('data_response')
            .map(function (data) { return data.json().msg; });
    };
    // saveTermsState(termsState: any) {
    //     this.termsState = termsState;
    // }
    //
    // getTermsState() {
    //     return this.termsState;
    // }
    //
    // saveTopicsState(topicsState: any) {
    //     this.topicsState = topicsState;
    // }
    //
    // getTopicsState() {
    //     return this.topicsState;
    // }
    //
    //
    TweetService.prototype.getLastKnownHashtag = function () {
        return this.lastKnownHashtag;
    };
    TweetService.prototype.getLastKnownData = function () {
        return this.lastKnownData;
    };
    return TweetService;
}());
TweetService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ng2_socket_io_1.Socket, http_1.Http])
], TweetService);
exports.TweetService = TweetService;
//# sourceMappingURL=tweet.service.js.map
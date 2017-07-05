"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
// import {AppRoutingModule} from './app-routing.module';
var http_1 = require("@angular/http");
var tweet_service_1 = require("./tweet.service");
var forms_1 = require("@angular/forms");
var ng2_charts_1 = require("ng2-charts");
var sentiment_component_1 = require("./sentiment.component");
var control_component_1 = require("./control.component");
var ng_socket_io_1 = require("ng-socket-io");
// import {AppRoutingModule} from "./app-routing.module";
var config = { url: 'http://localhost:5000', options: {} };
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            // AppRoutingModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            ng2_charts_1.ChartsModule,
            ng_socket_io_1.SocketIoModule.forRoot(config)
        ],
        declarations: [app_component_1.AppComponent,
            sentiment_component_1.SentimentComponent,
            control_component_1.ControlComponent
        ],
        providers: [tweet_service_1.TweetService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
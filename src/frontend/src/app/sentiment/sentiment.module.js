"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var sentiment_routing_module_1 = require("./sentiment-routing.module");
var sentiment_component_1 = require("./sentiment.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var ng2_charts_1 = require("ng2-charts");
var SentimentModule = (function () {
    function SentimentModule() {
    }
    return SentimentModule;
}());
SentimentModule = __decorate([
    core_1.NgModule({
        imports: [
            sentiment_routing_module_1.SentimentRoutingModule,
            ng2_charts_1.ChartsModule,
            forms_1.FormsModule,
            common_1.CommonModule
        ],
        declarations: [sentiment_component_1.SentimentComponent]
    })
], SentimentModule);
exports.SentimentModule = SentimentModule;
//# sourceMappingURL=sentiment.module.js.map
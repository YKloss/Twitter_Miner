"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var topics_routing_module_1 = require("./topics-routing.module");
var topics_component_1 = require("./topics.component");
var ng2_charts_1 = require("ng2-charts");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var TopicsModule = (function () {
    function TopicsModule() {
    }
    return TopicsModule;
}());
TopicsModule = __decorate([
    core_1.NgModule({
        imports: [
            topics_routing_module_1.TopicsRoutingModule,
            ng2_charts_1.ChartsModule,
            forms_1.FormsModule,
            common_1.CommonModule
        ],
        declarations: [topics_component_1.TopicsComponent]
    })
], TopicsModule);
exports.TopicsModule = TopicsModule;
//# sourceMappingURL=topics.module.js.map
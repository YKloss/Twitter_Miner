"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var terms_routing_module_1 = require("./terms-routing.module");
var terms_component_1 = require("./terms.component");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var TermsModule = (function () {
    function TermsModule() {
    }
    return TermsModule;
}());
TermsModule = __decorate([
    core_1.NgModule({
        imports: [
            terms_routing_module_1.TermsRoutingModule,
            forms_1.FormsModule,
            common_1.CommonModule
        ],
        declarations: [terms_component_1.TermsComponent]
    })
], TermsModule);
exports.TermsModule = TermsModule;
//# sourceMappingURL=terms.module.js.map
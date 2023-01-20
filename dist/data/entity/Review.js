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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
var typeorm_1 = require("typeorm");
var Rate_1 = require("../../enums/Rate");
var Class_1 = require("./Class");
var Review = /** @class */ (function () {
    function Review() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Review.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Review.prototype, "comment", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: Rate_1.Rate,
            default: Rate_1.Rate.AVERAGE,
        }),
        __metadata("design:type", String)
    ], Review.prototype, "rate", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Class_1.Class; }, function (classs) { return classs.reviews; }),
        __metadata("design:type", Class_1.Class)
    ], Review.prototype, "class", void 0);
    Review = __decorate([
        (0, typeorm_1.Entity)()
    ], Review);
    return Review;
}());
exports.Review = Review;
//# sourceMappingURL=Review.js.map
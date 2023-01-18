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
exports.Class = void 0;
var typeorm_1 = require("typeorm");
var AgeGroup_1 = require("../../Enums/AgeGroup");
var Sport_1 = require("./Sport");
var Class = /** @class */ (function () {
    function Class() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Class.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: AgeGroup_1.AgeGroup,
            default: AgeGroup_1.AgeGroup.CHILDREN,
        }),
        __metadata("design:type", String)
    ], Class.prototype, "ageGroup", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Sport_1.Sport; }, function (sport) { return sport.classes; }),
        __metadata("design:type", Sport_1.Sport)
    ], Class.prototype, "sport", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Class.prototype, "duration", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Class.prototype, "description", void 0);
    Class = __decorate([
        (0, typeorm_1.Entity)()
    ], Class);
    return Class;
}());
exports.Class = Class;
//# sourceMappingURL=Class.js.map
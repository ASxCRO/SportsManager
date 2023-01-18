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
exports.ClassAppointment = void 0;
var typeorm_1 = require("typeorm");
var Class_1 = require("./Class");
var User_1 = require("./User");
var ClassAppointment = /** @class */ (function () {
    function ClassAppointment() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ClassAppointment.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Class_1.Class; }, function (classs) { return classs.classAppointments; }),
        __metadata("design:type", Class_1.Class)
    ], ClassAppointment.prototype, "classs", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return User_1.User; }, function (user) { return user.classAppointments; }),
        __metadata("design:type", Array)
    ], ClassAppointment.prototype, "users", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], ClassAppointment.prototype, "dateStarting", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ClassAppointment.prototype, "description", void 0);
    ClassAppointment = __decorate([
        (0, typeorm_1.Entity)()
    ], ClassAppointment);
    return ClassAppointment;
}());
exports.ClassAppointment = ClassAppointment;
//# sourceMappingURL=ClassAppointment.js.map
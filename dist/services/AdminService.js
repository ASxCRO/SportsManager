"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
var data_source_1 = require("../data/data-source");
var Class_1 = require("../data/entity/Class");
var ClassAppointment_1 = require("../data/entity/ClassAppointment");
var Review_1 = require("../data/entity/Review");
var Sport_1 = require("../data/entity/Sport");
var AdminService = /** @class */ (function () {
    function AdminService() {
        this.sportRepository = data_source_1.AppDataSource.getRepository(Sport_1.Sport);
        this.classRepository = data_source_1.AppDataSource.getRepository(Class_1.Class);
        this.classAppointmentRepository = data_source_1.AppDataSource.getRepository(ClassAppointment_1.ClassAppointment);
        this.reviewRepository = data_source_1.AppDataSource.getRepository(Review_1.Review);
    }
    AdminService.prototype.createClass = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var description, ageGroup, sportId, duration, classs, _a, newClass;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        description = data.description, ageGroup = data.ageGroup, sportId = data.sportId, duration = data.duration;
                        classs = new Class_1.Class();
                        classs.description = description;
                        classs.ageGroup = ageGroup;
                        _a = classs;
                        return [4 /*yield*/, this.sportRepository.findOneBy({ id: sportId })];
                    case 1:
                        _a.sport = _b.sent();
                        classs.duration = duration;
                        return [4 /*yield*/, this.classRepository.save(classs)];
                    case 2:
                        newClass = _b.sent();
                        return [2 /*return*/, newClass];
                }
            });
        });
    };
    AdminService.prototype.updateClass = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var description, ageGroup, sportId, duration, classId, classs, _a, newClass;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        description = data.description, ageGroup = data.ageGroup, sportId = data.sportId, duration = data.duration, classId = data.classId;
                        return [4 /*yield*/, this.classRepository.findOneBy({ id: classId })];
                    case 1:
                        classs = _b.sent();
                        classs.description = description;
                        classs.ageGroup = ageGroup;
                        _a = classs;
                        return [4 /*yield*/, this.sportRepository.findOneBy({ id: sportId })];
                    case 2:
                        _a.sport = _b.sent();
                        classs.duration = duration;
                        return [4 /*yield*/, this.classRepository.save(classs)];
                    case 3:
                        newClass = _b.sent();
                        return [2 /*return*/, newClass];
                }
            });
        });
    };
    AdminService.prototype.deleteClass = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.classRepository.delete({ id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AdminService.prototype.createClassAppointment = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var description, classId, dateStarting, classsApp, _a, newClassApp;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        description = data.description, classId = data.classId, dateStarting = data.dateStarting;
                        classsApp = new ClassAppointment_1.ClassAppointment();
                        classsApp.description = description;
                        classsApp.dateStarting = dateStarting;
                        _a = classsApp;
                        return [4 /*yield*/, this.classRepository.findOneBy({ id: classId })];
                    case 1:
                        _a.classs = _b.sent();
                        return [4 /*yield*/, this.classAppointmentRepository.save(classsApp)];
                    case 2:
                        newClassApp = _b.sent();
                        return [2 /*return*/, newClassApp];
                }
            });
        });
    };
    AdminService.prototype.updateClassAppointment = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var description, classId, dateStarting, classAppointmentId, classsApp, _a, newClassApp;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        description = data.description, classId = data.classId, dateStarting = data.dateStarting, classAppointmentId = data.classAppointmentId;
                        return [4 /*yield*/, this.classAppointmentRepository.findOneBy({
                                id: classAppointmentId,
                            })];
                    case 1:
                        classsApp = _b.sent();
                        classsApp.dateStarting = dateStarting;
                        _a = classsApp;
                        return [4 /*yield*/, this.classRepository.findOneBy({
                                id: classId,
                            })];
                    case 2:
                        _a.classs = _b.sent();
                        classsApp.description = description;
                        return [4 /*yield*/, this.classAppointmentRepository.save(classsApp)];
                    case 3:
                        newClassApp = _b.sent();
                        return [2 /*return*/, newClassApp];
                }
            });
        });
    };
    AdminService.prototype.deleteClassAppointment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.classAppointmentRepository.delete({ id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AdminService.prototype.readReviews = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reviewRepository.find({
                            relations: {
                                class: true,
                            },
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AdminService;
}());
exports.AdminService = AdminService;
//# sourceMappingURL=AdminService.js.map
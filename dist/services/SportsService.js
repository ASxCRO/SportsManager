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
exports.SportsService = void 0;
var data_source_1 = require("../data/data-source");
var Class_1 = require("../data/entity/Class");
var ClassAppointment_1 = require("../data/entity/ClassAppointment");
var Review_1 = require("../data/entity/Review");
var Sport_1 = require("../data/entity/Sport");
var User_1 = require("../data/entity/User");
var SportsService = /** @class */ (function () {
    function SportsService() {
        this.sportRepository = data_source_1.AppDataSource.getRepository(Sport_1.Sport);
        this.classRepository = data_source_1.AppDataSource.getRepository(Class_1.Class);
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        this.classAppointmentRepository = data_source_1.AppDataSource.getRepository(ClassAppointment_1.ClassAppointment);
        this.reviewRepository = data_source_1.AppDataSource.getRepository(Review_1.Review);
    }
    SportsService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sportRepository.find()];
            });
        });
    };
    SportsService.prototype.getClasses = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var classes, sportsFromParams, ageGroup, filteredClasses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        classes = data_source_1.AppDataSource.createQueryBuilder(Class_1.Class, 'class')
                            .leftJoinAndSelect('class.sport', 'sport')
                            .leftJoinAndSelect('class.classAppointments', 'classAppointments');
                        if (data.sports) {
                            sportsFromParams = data.sports.split(',');
                            classes.where('sport.name IN (:...sports)', {
                                sports: sportsFromParams,
                            });
                        }
                        if (data.ageGroup) {
                            ageGroup = data.ageGroup;
                            classes.andWhere('class.ageGroup = :ageGroup', {
                                ageGroup: ageGroup,
                            });
                        }
                        return [4 /*yield*/, classes.getMany()];
                    case 1:
                        filteredClasses = _a.sent();
                        return [2 /*return*/, filteredClasses];
                }
            });
        });
    };
    SportsService.prototype.getDetailsOfClass = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var classes, filteredClasses, averageReviewRate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        classes = data_source_1.AppDataSource.createQueryBuilder(Class_1.Class, 'class')
                            .leftJoinAndSelect('class.sport', 'sport')
                            .leftJoinAndSelect('class.classAppointments', 'classAppointments')
                            .leftJoinAndSelect('class.reviews', 'review');
                        if (data.id) {
                            classes.where('class.id = :id', {
                                id: data.id,
                            });
                        }
                        return [4 /*yield*/, classes.getOne()];
                    case 1:
                        filteredClasses = _a.sent();
                        averageReviewRate = filteredClasses.reviews.reduce(function (accumulator, classs) { return accumulator + parseInt(classs.rate); }, 0) / filteredClasses.reviews.length;
                        return [2 /*return*/, {
                                filteredClasses: filteredClasses,
                                averageReviewRate: averageReviewRate,
                            }];
                }
            });
        });
    };
    SportsService.prototype.enrollToClass = function (data, userParam) {
        return __awaiter(this, void 0, void 0, function () {
            var user, alreadyEnrolled, classs, newUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.userRepository.findOneOrFail({
                                relations: {
                                    classes: true,
                                },
                                where: {
                                    id: userParam.id,
                                },
                            })];
                    case 1:
                        user = _a.sent();
                        alreadyEnrolled = user.classes.filter(function (e) { return e.id === data.classId; });
                        if (alreadyEnrolled.length > 0) {
                            return [2 /*return*/, {
                                    message: 'User already applied to this class',
                                    status: 404,
                                    data: {},
                                }];
                        }
                        if (!(user.classes.length < 2)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.classRepository.findOneByOrFail({
                                id: data.classId,
                            })];
                    case 2:
                        classs = _a.sent();
                        user.classes.push(classs);
                        return [4 /*yield*/, data_source_1.AppDataSource.manager.save(user)];
                    case 3:
                        newUser = _a.sent();
                        return [2 /*return*/, {
                                message: 'User enrolled to class!',
                                status: 200,
                                data: newUser,
                            }];
                    case 4: return [2 /*return*/, {
                            message: 'User cant apply to more than 2 classes',
                            status: 404,
                            data: {},
                        }];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SportsService.prototype.enrollToClassAppointment = function (data, userParam) {
        return __awaiter(this, void 0, void 0, function () {
            var user, alreadyEnrolled, usersCountOnAppointment, classAppointment, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneOrFail({
                            relations: {
                                classAppointments: true,
                            },
                            where: {
                                id: userParam.id,
                            },
                        })];
                    case 1:
                        user = _a.sent();
                        alreadyEnrolled = user.classAppointments.filter(function (e) { return e.id === data.classAppointmentId; });
                        if (alreadyEnrolled.length > 0) {
                            return [2 /*return*/, {
                                    message: 'User already applied to this appointment',
                                    status: 404,
                                    data: {},
                                }];
                        }
                        usersCountOnAppointment = user.classAppointments.length;
                        if (!(usersCountOnAppointment < 10)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.classAppointmentRepository.findOneByOrFail({
                                id: data.classAppointmentId,
                            })];
                    case 2:
                        classAppointment = _a.sent();
                        user.classAppointments.push(classAppointment);
                        return [4 /*yield*/, data_source_1.AppDataSource.manager.save(user)];
                    case 3:
                        newUser = _a.sent();
                        return [2 /*return*/, {
                                message: 'Enrolled',
                                status: 200,
                                data: newUser,
                            }];
                    case 4: return [2 /*return*/, {
                            message: 'User cant apply to more than 10 class appointments',
                            status: 404,
                            data: {},
                        }];
                }
            });
        });
    };
    SportsService.prototype.unrollClass = function (data, userParam) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isEnrolled, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneOrFail({
                            relations: {
                                classes: true,
                            },
                            where: {
                                id: userParam.id,
                            },
                        })];
                    case 1:
                        user = _a.sent();
                        isEnrolled = user.classes.filter(function (e) { return e.id === data.classId; });
                        if (isEnrolled.length < 1) {
                            return [2 /*return*/, {
                                    message: 'User not even applied to this class',
                                    status: 404,
                                    data: {},
                                }];
                        }
                        user.classes = user.classes.filter(function (classs) {
                            return classs.id !== data.classId;
                        });
                        return [4 /*yield*/, data_source_1.AppDataSource.manager.save(user)];
                    case 2:
                        newUser = _a.sent();
                        return [2 /*return*/, {
                                message: 'Enrolled',
                                status: 200,
                                data: newUser,
                            }];
                }
            });
        });
    };
    SportsService.prototype.unrollClassAppointment = function (data, userParam) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isEnrolled, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneOrFail({
                            relations: {
                                classAppointments: true,
                            },
                            where: {
                                id: userParam.id,
                            },
                        })];
                    case 1:
                        user = _a.sent();
                        isEnrolled = user.classAppointments.filter(function (e) { return e.id === data.classAppointmentId; });
                        if (isEnrolled.length < 1) {
                            return [2 /*return*/, {
                                    message: 'User not even applied to this appointment',
                                    status: 404,
                                    data: {},
                                }];
                        }
                        user.classAppointments = user.classAppointments.filter(function (classApointment) {
                            return classApointment.id !== data.classAppointmentId;
                        });
                        return [4 /*yield*/, data_source_1.AppDataSource.manager.save(user)];
                    case 2:
                        newUser = _a.sent();
                        return [2 /*return*/, {
                                message: 'Unrolled of class appointment',
                                status: 200,
                                data: newUser,
                            }];
                }
            });
        });
    };
    SportsService.prototype.postReview = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var comment, rate, classId, review, _a, newReview;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        comment = data.comment, rate = data.rate, classId = data.classId;
                        review = new Review_1.Review();
                        _a = review;
                        return [4 /*yield*/, this.classRepository.findOneByOrFail({ id: classId })];
                    case 1:
                        _a.class = _b.sent();
                        review.comment = comment;
                        review.rate = rate;
                        return [4 /*yield*/, this.reviewRepository.save(review)];
                    case 2:
                        newReview = _b.sent();
                        return [2 /*return*/, {
                                message: 'New review',
                                status: 200,
                                data: newReview,
                            }];
                }
            });
        });
    };
    return SportsService;
}());
exports.SportsService = SportsService;
//# sourceMappingURL=SportsService.js.map
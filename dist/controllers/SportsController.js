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
var SportsService_1 = require("../services/SportsService");
var enrollToClassAppointmentValidationSchema_1 = require("../Validators/Sports/enrollToClassAppointmentValidationSchema");
var enrollToClassValidationSchema_1 = require("../Validators/Sports/enrollToClassValidationSchema");
var getClassesValidationSchema_1 = require("../Validators/Sports/getClassesValidationSchema");
var getDetailsOfClassValidationSchema_1 = require("../Validators/Sports/getDetailsOfClassValidationSchema");
var postReviewValidationSchema_1 = require("../Validators/Sports/postReviewValidationSchema");
var unrollClassAppointmentValidationSchema_1 = require("../Validators/Sports/unrollClassAppointmentValidationSchema");
var unrollClassValidationSchema_1 = require("../Validators/Sports/unrollClassValidationSchema");
var SportsController = /** @class */ (function () {
    function SportsController() {
        this.sportsService = new SportsService_1.SportsService();
    }
    SportsController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sports, e_1, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sportsService.getAll()];
                    case 1:
                        sports = _a.sent();
                        res.status(200).json({
                            status: true,
                            message: 'sports fetched successfully',
                            data: sports,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        error = e_1;
                        res.status(422).json({
                            status: false,
                            message: 'Error',
                            data: { errors: error.errors },
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SportsController.prototype.getClasses = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, classes, e_2, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = getClassesValidationSchema_1.getClassesValidationSchema.validateSync(req.query, {
                            abortEarly: false,
                            stripUnknown: true,
                        });
                        return [4 /*yield*/, this.sportsService.getClasses(data)];
                    case 1:
                        classes = _a.sent();
                        res.status(200).json({
                            status: true,
                            message: 'classes fetched successfully',
                            data: classes,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        error = e_2;
                        res.status(422).json({
                            status: false,
                            message: 'Error',
                            data: { errors: error.errors },
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SportsController.prototype.getDetailsOfClass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, classes, e_3, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = getDetailsOfClassValidationSchema_1.getDetailsOfClassValidationSchema.validateSync(req.params, {
                            abortEarly: false,
                            stripUnknown: true,
                        });
                        return [4 /*yield*/, this.sportsService.getDetailsOfClass(data)];
                    case 1:
                        classes = _a.sent();
                        res.status(200).json({
                            status: true,
                            message: 'classes fetched successfully',
                            data: classes,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        error = e_3;
                        res.status(422).json({
                            status: false,
                            message: 'Error',
                            data: { errors: error.errors },
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SportsController.prototype.enrollToClass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, response, e_4, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = enrollToClassValidationSchema_1.enrollToClassValidationSchema.validateSync(req.body.bodyData, {
                            abortEarly: false,
                            stripUnknown: true,
                        });
                        return [4 /*yield*/, this.sportsService.enrollToClass(data, req.body.user)];
                    case 1:
                        response = _a.sent();
                        res.status(response.status).json({
                            status: true,
                            message: response.message,
                            data: response.data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        error = e_4;
                        res.status(422).json({
                            status: false,
                            message: 'Error',
                            data: { errors: error.errors },
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SportsController.prototype.enrollToClassAppointment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, response, e_5, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = enrollToClassAppointmentValidationSchema_1.enrollToClassAppointmentValidationSchema.validateSync(req.body.bodyData, {
                            abortEarly: false,
                            stripUnknown: true,
                        });
                        return [4 /*yield*/, this.sportsService.enrollToClassAppointment(data, req.body.user)];
                    case 1:
                        response = _a.sent();
                        res.status(response.status).json({
                            status: true,
                            message: response.message,
                            data: response.data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        error = e_5;
                        res.status(422).json({
                            status: false,
                            message: 'Error',
                            data: { errors: error.errors },
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SportsController.prototype.unrollClass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, response, e_6, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = unrollClassValidationSchema_1.unrollClassValidationSchema.validateSync(req.body.bodyData, {
                            abortEarly: false,
                            stripUnknown: true,
                        });
                        return [4 /*yield*/, this.sportsService.unrollClass(data, req.body.user)];
                    case 1:
                        response = _a.sent();
                        res.status(response.status).json({
                            status: true,
                            message: response.message,
                            data: response.data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        error = e_6;
                        res.status(422).json({
                            status: false,
                            message: 'Error',
                            data: { errors: error.errors },
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SportsController.prototype.unrollClassAppointment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, response, e_7, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = unrollClassAppointmentValidationSchema_1.unrollClassAppointmentValidationSchema.validateSync(req.body.bodyData, {
                            abortEarly: false,
                            stripUnknown: true,
                        });
                        return [4 /*yield*/, this.sportsService.unrollClassAppointment(data, req.body.user)];
                    case 1:
                        response = _a.sent();
                        res.status(response.status).json({
                            status: true,
                            message: response.message,
                            data: response.data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _a.sent();
                        error = e_7;
                        res.status(422).json({
                            status: false,
                            message: 'Error',
                            data: { errors: error.errors },
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SportsController.prototype.postReview = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, response, e_8, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = postReviewValidationSchema_1.postReviewValidationSchema.validateSync(req.body.bodyData, {
                            abortEarly: false,
                            stripUnknown: true,
                        });
                        return [4 /*yield*/, this.sportsService.postReview(data)];
                    case 1:
                        response = _a.sent();
                        res.status(response.status).json({
                            status: true,
                            message: response.message,
                            data: response.data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _a.sent();
                        error = e_8;
                        res.status(422).json({
                            status: false,
                            message: 'Error',
                            data: { errors: error.errors },
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SportsController;
}());
exports.default = SportsController;
//# sourceMappingURL=SportsController.js.map
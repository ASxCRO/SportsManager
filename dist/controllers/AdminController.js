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
var AdminService_1 = require("../services/AdminService");
var createClassAppointmentValidationSchema_1 = require("../Validators/Admin/ClassAppointments/createClassAppointmentValidationSchema");
var updateClassAppointmentValidationSchema_1 = require("../Validators/Admin/ClassAppointments/updateClassAppointmentValidationSchema");
var createClassValidationSchema_1 = require("../Validators/Admin/Classes/createClassValidationSchema");
var deleteClassValidationSchema_1 = require("../Validators/Admin/Classes/deleteClassValidationSchema");
var updateClassValidationSchema_1 = require("../Validators/Admin/Classes/updateClassValidationSchema");
var AdminController = /** @class */ (function () {
    function AdminController() {
        this.adminService = new AdminService_1.AdminService();
    }
    AdminController.prototype.createClass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, newClass, e_1, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = createClassValidationSchema_1.createClassValidationSchema.validateSync(req.body.bodyData, {
                            abortEarly: false,
                            stripUnknown: true,
                        });
                        return [4 /*yield*/, this.adminService.createClass(data)];
                    case 1:
                        newClass = _a.sent();
                        res.status(200).json({
                            status: true,
                            message: 'Class created',
                            data: newClass,
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
    AdminController.prototype.updateClass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, newClass, e_2, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = updateClassValidationSchema_1.updateClassValidationSchema.validateSync(req.body.bodyData, {
                            abortEarly: false,
                            stripUnknown: true,
                        });
                        return [4 /*yield*/, this.adminService.updateClass(data)];
                    case 1:
                        newClass = _a.sent();
                        res.status(200).json({
                            status: true,
                            message: 'Class updated',
                            data: newClass,
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
    AdminController.prototype.deleteClass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_3, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = deleteClassValidationSchema_1.deleteClassValidationSchema.validateSync(req.body.bodyData, {
                            abortEarly: false,
                            stripUnknown: true,
                        });
                        return [4 /*yield*/, this.adminService.deleteClass(data.id)];
                    case 1:
                        _a.sent();
                        res.status(200).json({
                            status: true,
                            message: 'Class deleted',
                            data: {},
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
    AdminController.prototype.createClassAppointment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, newClassApp, e_4, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = createClassAppointmentValidationSchema_1.createClassAppointmentValidationSchema.validateSync(req.body.bodyData, {
                            abortEarly: false,
                            stripUnknown: true,
                        });
                        return [4 /*yield*/, this.adminService.createClassAppointment(data)];
                    case 1:
                        newClassApp = _a.sent();
                        res.status(200).json({
                            status: true,
                            message: 'Class appointment created',
                            data: newClassApp,
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
    AdminController.prototype.updateClassAppointment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, newClassApp, e_5, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = updateClassAppointmentValidationSchema_1.updateClassAppointmentValidationSchema.validateSync(req.body.bodyData, {
                            abortEarly: false,
                            stripUnknown: true,
                        });
                        return [4 /*yield*/, this.adminService.updateClassAppointment(data)];
                    case 1:
                        newClassApp = _a.sent();
                        res.status(200).json({
                            status: true,
                            message: 'Class appointment updated',
                            data: newClassApp,
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
    AdminController.prototype.deleteClassAppointment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_6, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = deleteClassValidationSchema_1.deleteClassValidationSchema.validateSync(req.body.bodyData, {
                            abortEarly: false,
                            stripUnknown: true,
                        });
                        return [4 /*yield*/, this.adminService.deleteClassAppointment(data.id)];
                    case 1:
                        _a.sent();
                        res.status(200).json({
                            status: true,
                            message: 'Class appointment deleted',
                            data: {},
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
    AdminController.prototype.readReviews = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reviews, e_7, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminService.readReviews()];
                    case 1:
                        reviews = _a.sent();
                        res.status(200).json({
                            status: true,
                            message: 'Reviews fetched',
                            data: reviews,
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
    return AdminController;
}());
exports.default = AdminController;
//todo
//Create & Read Comments on Sport Class
// Each user should be allowed to rate and leave comments for each sports class
// anonymously, but only admins should have access to it. The average rating should be
// applied and calculated for each sports class
// The sports complex requires an admin dashboard where its employees
// would be able to view, edit and manage classes for each of the sports, change dates and times
// for each week and view users who applied for each course in a given period.
//# sourceMappingURL=AdminController.js.map
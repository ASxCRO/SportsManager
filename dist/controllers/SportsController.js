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
var SportsController = /** @class */ (function () {
    function SportsController(sportService) {
        this.sportService = sportService;
        this.sportsService = sportService;
    }
    SportsController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sports, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sportsService.getAll(req.body)];
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
                        res.status(404).json({
                            status: true,
                            message: 'Problem with fetching sports',
                            data: {},
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SportsController.prototype.getClasses = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var classes, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sportsService.getClasses(req.query)];
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
                        res.status(404).json({
                            status: true,
                            message: 'Problem with fetching classes',
                            data: {},
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SportsController.prototype.getDetailsOfClass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var classes, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sportsService.getDetailsOfClass(req.params)];
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
                        res.status(404).json({
                            status: true,
                            message: 'Problem with fetching classes',
                            data: {},
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SportsController.prototype.enrollToClass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sportsService.enrollToClass(req.body)];
                    case 1:
                        data = _a.sent();
                        res.status(data.status).json({
                            status: true,
                            message: data.message,
                            data: data.data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        res.status(404).json({
                            status: true,
                            message: 'Problem with enrolling',
                            data: {},
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SportsController.prototype.enrollToClassAppointment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sportsService.enrollToClassAppointment(req.body)];
                    case 1:
                        data = _a.sent();
                        res.status(data.status).json({
                            status: true,
                            message: data.message,
                            data: data.data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5);
                        res.status(404).json({
                            status: true,
                            message: 'Problem with enrolling',
                            data: {},
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SportsController.prototype.unrollClass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sportsService.unrollClass(req.body)];
                    case 1:
                        data = _a.sent();
                        res.status(data.status).json({
                            status: true,
                            message: data.message,
                            data: data.data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6);
                        res.status(404).json({
                            status: true,
                            message: 'Problem with unrolling',
                            data: {},
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SportsController.prototype.unrollClassAppointment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sportsService.unrollClassAppointment(req.body)];
                    case 1:
                        data = _a.sent();
                        res.status(data.status).json({
                            status: true,
                            message: data.message,
                            data: data.data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _a.sent();
                        console.log(e_7);
                        res.status(404).json({
                            status: true,
                            message: 'Problem with unrolling',
                            data: {},
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
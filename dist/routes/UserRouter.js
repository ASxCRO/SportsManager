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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const http_errors_1 = __importDefault(require("http-errors"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
const auth_1 = __importDefault(require("../middlewares/auth"));
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield AuthService_1.default.register(req.body);
        res.status(200).json({
            status: true,
            message: 'User created successfully',
            data: user,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield AuthService_1.default.login(req.body);
        res.status(200).json({
            status: true,
            message: 'Account login successful',
            data,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
}));
router.get('/all', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield AuthService_1.default.all();
        res.status(200).json({
            status: true,
            message: 'All users',
            data: users,
        });
    }
    catch (e) {
        next((0, http_errors_1.default)(e.statusCode, e.message));
    }
}));
exports.default = router;

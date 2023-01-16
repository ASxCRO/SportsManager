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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
class jwtUtil {
    static signAccessToken(payload) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign({ payload }, accessTokenSecret, {}, (err, token) => {
                if (err) {
                    reject(http_errors_1.default.InternalServerError());
                }
                resolve(token);
            });
        });
    }
    static verifyAccessToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(token, accessTokenSecret, (err, payload) => {
                    if (err) {
                        const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                        return reject(http_errors_1.default.Unauthorized(message));
                    }
                    resolve(payload);
                });
            });
        });
    }
}
exports.default = jwtUtil;
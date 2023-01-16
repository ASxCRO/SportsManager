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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../utils/jwt"));
dotenv_1.default.config();
class AuthService {
    static register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = data;
            data.password = bcryptjs_1.default.hashSync(data.password, 8);
            let user = prisma.user.create({
                data,
            });
            data.accessToken = yield jwt_1.default.signAccessToken(user);
            return data;
        });
    }
    static login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const user = yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                throw http_errors_1.default.NotFound('User not registered');
            }
            const checkPassword = bcryptjs_1.default.compareSync(password, user.password);
            if (!checkPassword)
                throw http_errors_1.default.Unauthorized('Email address or password not valid');
            const accessToken = yield jwt_1.default.signAccessToken(user);
            return Object.assign(Object.assign({}, user), { accessToken });
        });
    }
    static all() {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield prisma.user.findMany();
            return allUsers;
        });
    }
}
exports.default = AuthService;

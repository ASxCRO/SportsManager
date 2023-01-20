"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Class_1 = require("./entity/Class");
var ClassAppointment_1 = require("./entity/ClassAppointment");
var Review_1 = require("./entity/Review");
var Sport_1 = require("./entity/Sport");
var User_1 = require("./entity/User");
var _1673993063306_newVerifiedPropOnUser_1 = __importDefault(require("./migration/1673993063306-newVerifiedPropOnUser"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Sport_1.Sport, Class_1.Class, ClassAppointment_1.ClassAppointment, Review_1.Review],
    migrations: [_1673993063306_newVerifiedPropOnUser_1.default],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map
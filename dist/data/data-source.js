"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Class_1 = require("./entity/Class");
var Sport_1 = require("./entity/Sport");
var User_1 = require("./entity/User");
var _1673993063306_newVerifiedPropOnUser_1 = __importDefault(require("./migration/1673993063306-newVerifiedPropOnUser"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'manager_postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'sportsmanager',
    synchronize: true,
    logging: false,
    entities: [User_1.User, Sport_1.Sport, Class_1.Class],
    migrations: [_1673993063306_newVerifiedPropOnUser_1.default],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map
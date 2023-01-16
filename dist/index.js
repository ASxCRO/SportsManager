"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('HELLO FROM EXPRESS + TS!!!!');
});
app.get('/hi', (req, res) => {
    res.send('BYEEE!!');
});
app.use('/users', UserRouter_1.default);
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SportsManager Express API with Swagger',
            version: '0.1.0',
            description: 'Crud Api documented with Swagger',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'SportManager',
                url: 'https://antoniosupan.netlify.app/',
                email: 'antonio.suups@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['dist/routes/*.js'],
};
const specs = (0, swagger_jsdoc_1.default)(options);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});

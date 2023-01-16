"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
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
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});

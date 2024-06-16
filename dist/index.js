"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_winston_1 = require("express-winston");
const { logger, requestLogger } = require('./utils/logger');
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_winston_1.logger)({
    winstonInstance: requestLogger,
    statusLevels: true,
    requestWhitelist: ['body'],
    responseWhitelist: ['body'],
}));
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'The API is running',
    });
});
const server = app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
app.use('/api/v1', (0, routes_1.default)());
app.use((0, express_winston_1.errorLogger)({
    winstonInstance: logger,
}));
module.exports = { app, server };

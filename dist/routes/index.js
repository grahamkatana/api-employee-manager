"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_1 = __importDefault(require("./employee"));
const router = (0, express_1.Router)();
exports.default = () => {
    (0, employee_1.default)(router);
    return router;
};

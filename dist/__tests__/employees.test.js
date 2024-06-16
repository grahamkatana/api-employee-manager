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
const supertest_1 = __importDefault(require("supertest"));
const { app, server } = require('../index');
const __mocks__1 = require("../__mocks__");
describe('Employees endpoints--->', () => {
    afterAll(() => {
        server.close();
    });
    it('GET /api/v1/employees should return a list of employees:', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/api/v1/employees');
        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Object);
    }));
    it("POST /api/v1/employees should return an object of created employee", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/api/v1/employees').send(Object.assign({}, __mocks__1.employeeMock));
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    }));
    it("POST /api/v1/employees should return a 422 error", () => __awaiter(void 0, void 0, void 0, function* () {
        let mockData = __mocks__1.employeeMock;
        mockData.first_name = '';
        const response = yield (0, supertest_1.default)(app).post('/api/v1/employees').send(Object.assign({}, mockData));
        expect(response.status).toBe(422);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.errors).toBeInstanceOf(Array);
    }));
});

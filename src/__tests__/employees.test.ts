import request from 'supertest'
const { app, server } = require('../index');
import { employeeMock } from '../__mocks__';
describe('Employees endpoints--->', () => {
    afterAll(() => {
        server.close();
    })
    it('GET /api/v1/employees should return a list of employees:', async () => {
        const response = await request(app).get('/api/v1/employees')
        expect(response.status).toBe(200)
        expect(response.body.data).toBeInstanceOf(Object);
    })
    it("POST /api/v1/employees should return an object of created employee", async () => {
        const response = await request(app).post('/api/v1/employees').send({
            ...employeeMock
        });
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    })
    it("POST /api/v1/employees should return a 422 error", async () => {
        let mockData = employeeMock;
        mockData.first_name = '';
        const response = await request(app).post('/api/v1/employees').send({
            ...mockData
        });
        expect(response.status).toBe(422);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.errors).toBeInstanceOf(Array);
    })

})
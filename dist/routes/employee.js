"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employeeController_1 = require("../controllers/employeeController");
const employeeRequestValidator_1 = require("../utils/employeeRequestValidator");
// import validate
exports.default = (router) => {
    router.post("/employees", employeeRequestValidator_1.employeeRequestValidator, employeeController_1.createEmployee);
    router.get("/employees", employeeController_1.indexEmployee);
    router.get("/employees/:id", employeeController_1.showEmployee);
    router.patch("/employees/:id", employeeRequestValidator_1.employeeRequestValidator, employeeController_1.updateEmployee);
    router.delete("/employees/:id", employeeController_1.deleteEmployee);
};

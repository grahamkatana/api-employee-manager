import { Router } from "express";
import { createEmployee, indexEmployee,showEmployee,updateEmployee,deleteEmployee } from "../controllers/employeeController";
import { employeeRequestValidator } from "../utils/employeeRequestValidator";
// import validate
export default (router: Router) => {
    router.post("/employees", employeeRequestValidator, createEmployee);
    router.get("/employees", indexEmployee);
    router.get("/employees/:id", showEmployee);
    router.patch("/employees/:id", employeeRequestValidator, updateEmployee);
    router.delete("/employees/:id", deleteEmployee);
}
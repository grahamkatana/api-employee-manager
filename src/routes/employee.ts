import { Router } from "express";
import { createEmployee, indexEmployee } from "../controllers/employeeController";
import { employeeRequestValidator } from "../utils/employeeRequestValidator";
// import validate
export default (router: Router) => {
    router.post("/employees", employeeRequestValidator, createEmployee);
    router.get("/employees", indexEmployee);
}
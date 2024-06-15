import { Router } from "express";
import { createEmployee,indexEmployee } from "../controllers/employeeController";

export default (router:Router) => {
    router.post("/employees", createEmployee);
    router.get("/employees", indexEmployee);
}
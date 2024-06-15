import { Router } from "express";
import employee from "./employee";
const router = Router();


export default (): Router => {
    employee(router);
    return router;

}
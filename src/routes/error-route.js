import { Router } from "express";
import error_controller from "../controllers/error-controller.js";

const router = Router();
const {sendError} = error_controller;

router.get("/",sendError);

export default router;
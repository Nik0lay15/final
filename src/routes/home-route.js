import {Router} from "express";
import home_controllers from "../controllers/home-controller.js";

const router = Router();
const {homePage} = home_controllers;

router.get("/",homePage);

export default router;
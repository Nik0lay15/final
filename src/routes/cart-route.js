import {Router} from "express";
import auth_check from "../subscriptions/authenthicated.js";
import cart_controller from "../controllers/cart-controlller.js";

const router = Router();
const {reqAuthenthification} = auth_check;
const {getListCart} = cart_controller;

router.get("/",reqAuthenthification,getListCart);

export default router;
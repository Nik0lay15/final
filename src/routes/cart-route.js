import {Router} from "express";
import controllers from "../controllers/cart-controlller.js";

const router = Router();
const {getListCart,checkUser,addProduct,deleteProduct} = controllers;

router.get("/",checkUser,getListCart);
//router.get("/checkout");

router.post("/delete",checkUser,deleteProduct);
router.post("/:pid",checkUser,addProduct);


export default router;
import {Router} from "express";
import controllers from "../controllers/cart-controlller.js";

const router = Router();
const {getListCart,checkUser,addProduct,deleteProduct,checkCart,checkOutCart} = controllers;

router.get("/",checkUser,getListCart);
router.get("/checkout/:cid",checkCart,checkUser,checkOutCart);

router.post("/delete",checkUser,deleteProduct);
router.post("/:pid",checkUser,addProduct);


export default router;
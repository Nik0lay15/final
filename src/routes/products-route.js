import {Router} from "express";
import product_controllers from "../controllers/products-controller.js";

const router = Router();
const {viewProduct,editProducts,deleteProduct,showAddProduct,checkAdmin,addNewProduct} = product_controllers;

router.get("/edit",checkAdmin,editProducts);
router.post("/remove/:id",checkAdmin,deleteProduct);
router.get("/add",checkAdmin,showAddProduct);
router.get("/:id",viewProduct);

router.post("/add",checkAdmin,addNewProduct);

export default router;
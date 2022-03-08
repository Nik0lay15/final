import {Router} from "express";
import product_controllers from "../controllers/products-controller.js";

const router = Router();
const {viewProduct,editProducts,deleteProduct} = product_controllers;

router.get("/edit",editProducts);
router.post("/remove/:id",deleteProduct);
router.get("/:id",viewProduct);

export default router;
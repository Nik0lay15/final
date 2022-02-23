import {Router} from "express";
import product_controllers from "../controllers/products-controller.js";

const router = Router();
const {viewProduct} = product_controllers;

router.get("/:id",viewProduct);

export default router;
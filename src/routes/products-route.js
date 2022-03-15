import {Router} from "express";
import product_controllers from "../controllers/products-controller.js";

const router = Router();
const {
    viewProduct, 
    editProducts,
    deleteProduct,
    showAddProduct,
    checkAdmin,
    addNewProduct,
    editorProduct,
    editProduct
} = product_controllers;

router.get("/edit",checkAdmin,editProducts);
router.get("/edit/:pid",checkAdmin,editorProduct);
router.get("/add",checkAdmin,showAddProduct);
router.get("/:id",viewProduct);

router.post("/edit/:pid",checkAdmin,editProduct);
router.post("/remove/:id",checkAdmin,deleteProduct);
router.post("/add",checkAdmin,addNewProduct);

export default router;
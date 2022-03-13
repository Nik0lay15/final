import {Router} from "express";
import controllers from "../controllers/profile-controllers.js";
import multer  from "multer";

const router = Router();
const {showProfile,changeAvatar} = controllers;
const upload = multer({dest:"./public/profile"});

router.get("/:uid",showProfile);
router.post("/",upload.single("avatar"),changeAvatar);

export default router;
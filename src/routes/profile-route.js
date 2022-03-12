import {Router} from "express";
import controllers from "../controllers/profile-controllers.js";
import multer  from "multer";

const router = Router();
const {showProfile,changeAvatar} = controllers;
const upload = multer({dest:"./public/profile"});

router.get("/:uid",showProfile);

router.post("/",upload.single("avatar"),changeAvatar);
/*router.post("/",upload.single("avatar"),(req,res)=>{
    res.status(200).redirect("/home");
});*/

export default router;
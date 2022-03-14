import {Router} from "express";
import controllers from "../controllers/profile-controllers.js";
import multer  from "multer";

const router = Router();
const {
    showProfile,
    changeAvatar,
    listProfiles,
    deleteProfile,
    updateProfile,
    checkAdmin,
    checkAdminUser,
    editProfile
} = controllers;
const upload = multer({dest:"./public/profile"});

router.get("/edit",checkAdmin,listProfiles);
router.get("/edit/:uid",checkAdminUser,editProfile);
router.get("/:uid",showProfile);

router.post("/delete/:uid",checkAdmin,deleteProfile);
router.post("/edit",checkAdminUser,updateProfile);
router.post("/",upload.single("avatar"),changeAvatar);

export default router;
import {Router} from "express";
import controllers from "../controllers/profile-controllers.js";

const router = Router();
const {showProfile} = controllers;

router.get("/:uid",(req,res,next)=>{
    console.log("lol")
    next();
},showProfile);

export default router;
import {Router} from "express";
import passport from "passport";
import auth from "../subscriptions/strategys.js";

const router = Router();

router.get("/signin",(req,res)=>{
    res.render("signin",{title:"Signin"});
});
router.post("/signin",passport.authenticate("signin",{successRedirect:"/home",failureRedirect:"/dfa"}))

export default router;
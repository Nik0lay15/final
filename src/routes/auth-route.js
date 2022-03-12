import {Router} from "express";
import passport from "passport";
import auth from "../subscriptions/strategys.js";
import controllers from "../controllers/auth-controller.js";

const router = Router();
const {logIn,signIn,logOut} = controllers;

router.get("/signin",signIn)
router.get("/login",logIn)
router.get("/logout",logOut);

router.post("/signin",passport.authenticate("signin",{successRedirect:"/home",failureRedirect:"/dfa"}))
router.post("/login",passport.authenticate("login",{successRedirect:"/home",failureMessage:"/dfa"}));

export default router;
import {Strategy as LocalStrategy} from "passport-local";
import passport from "passport";
import uniqid from "uniqid";
import mailer from "../subscriptions/mailer.js";
import connection from "../database/connection.js";
import dao from "../database/dao.js";

const {userRegMail} = mailer;

const signin = passport.use("signin",new LocalStrategy({passReqToCallback:true,usernameField:"email"}, async(req,email,password,done)=>{
    try{
        await connection.Connect();
        await dao.readUsers(email,(user)=>{
            if(user.length > 0){
                console.log(user);
                return done(null,false,console.log("E-Mail already in use"));
            }else{
                const id = uniqid();
                const {name,address,phone,prefix,age} = req.body;
                await userRegMail(name,email,address,password,prefix,phone,age);
                dao.saveUser(id,email,password,name,address,age,prefix,phone,(save)=>{
                    return done(null,save);
                });
            }
        });
    }catch(error){
        console.log(error);
        return done(null,false);
    }
}));

const login = passport.use("login",new LocalStrategy({usernameField:"email"},async(email,password,done)=>{
    try{
        await connection.Connect();
        await dao.readUsers(email,(user)=>{
            if(user.length > 0){
                const user_password = user[0].password;
                dao.validatePassword(password,user_password,(valid)=>{
                    valid ? done(null,user[0]) : done(null,false,console.log("Invalid password"));
                });
            }else{
                return done(null,false,console.log("Email not valid or account does not exist"));
            }
        });
    }catch(error){
        throw(error)
    }
}));

passport.serializeUser((user,done)=>{
    return done(null,user.email);
});

passport.deserializeUser(async(id,done)=>{
    try{
        await connection.Connect();
        await dao.readUsers(id,(user)=>{
            return done(null,user);
        });
    }catch(error){
        console.log(error);
        return done(null,false);
    }
});

export default {
signin,
login,
}
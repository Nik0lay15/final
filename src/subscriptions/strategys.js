import {Strategy as LocalStrategy} from "passport-local";
import passport from "passport";
import connection from "../database/connection.js";
import dao from "../database/dao.js";

const signin = passport.use("signin",new LocalStrategy({passReqToCallback:true}, async(req,username,password,done)=>{
    try{
        await connection.Connect();
        await dao.readUsers(req.body.email,(user)=>{
            if(user.length > 0){
                console.log(user);
                return done(null,false,console.log("E-Mail already in use"));
            }else{
                dao.saveUser(req.body.email,username,password,(save)=>{
                    return done(null,save);
                });
            }
        });
        await connection.Disconnect();
    }catch(error){
        console.log(error);
        return done(null,false);
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
        await connection.Disconnect();
    }catch(error){
        console.log(error);
        return done(null,false);
    }
});

export default {
signin,
}
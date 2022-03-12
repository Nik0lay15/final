import services from "../services/profile-services.js";
import connection from "../database/connection.js";

const {searchProfile,updateAvatar} = services;

const showProfile = async(req,res)=>{
    try{
        await connection.Connect();
        const uid = req.params.uid;
        await searchProfile(uid,(profile)=>{
            if(profile){
                if(req.isAuthenticated() && req.user[0].uid == profile.uid){
                    const {name,email,admin} = profile;
                    const check = profile.uid == req.user[0].uid ? true : false;
                    res.status(200).render("profile",{title:`Profile:${profile.name}`,user:profile,name,email,uid,admin,check});
                }else{
                    res.status(200).render("profile",{title:`Profile:${profile.name}`,user:profile,name:profile.name,email:profile.email});
                }
            }else{
                res.status(404).render("error",{
                    title:profile,
                    status_code:404,
                    message:"Profile not found",
                })
            }
        });
        await connection.Disconnect();
    }catch(error){
        throw(error);
    }
};

const changeAvatar = async(req,res)=>{
    try{
        if(req.isAuthenticated()){
            await updateAvatar();
        }else{
            res.redirect("/");
        }
    }catch(error){
        throw(error);
    }
};

export default {
    showProfile,
    changeAvatar,
};
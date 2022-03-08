import services from "../services/profile-services.js";
import connection from "../database/connection.js";

const {searchProfile} = services;

const showProfile = async(req,res)=>{
    try{
        await connection.Connect();
        const uid = req.params.uid;
        await searchProfile(uid,(profile)=>{
            if(profile){
                const {name,email,admin} = profile;
                res.status(200).render("profile",{title:`Profile:${profile.name}`,user:profile,name,email,uid,admin});
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

export default {
    showProfile
};
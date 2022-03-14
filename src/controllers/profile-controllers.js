import services from "../services/profile-services.js";
import connection from "../database/connection.js";

const {searchProfile,updateAvatar,getProfiles,removeUser,updateUser,authAdmin,authAdminUser} = services;

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

const listProfiles = async(req,res)=>{
    try{
        const {name,admin} = req.user[0];

        await getProfiles((profiles)=>{
            res.status(200).render("profile-list",{
                title:"Edit profiles",
                user:req.user[0],
                admin,
                name,
                profiles
            });
        });
    }catch(error){
        console.log(error);
        res.render("error",{
            title:"Error",
            status_code:404,
            message:"Could not process your request"
        });
    }
};

const  editProfile = async(req,res)=>{
    try{
        const {uid} = req.params;
        await searchProfile(uid,(profile)=>{
            if(profile){
                const {admin,name} = req.user[0];

                res.status(200).render("profile-edit",{
                    title:"Edit profile",
                    user:req.user[0],
                    admin,
                    name,
                    profile_name:profile.name,
                    profile_email:profile.email,
                    profile_address:profile.address,
                    profile_age:profile.age,
                    profile_prefix:profile.prefix,
                    profile_phone:profile.phone,
                    profile_admin:profile.admin,
                });
            }else{
                res.status(404).render("error",{
                    title:"Profile not found",
                    status_code:404,
                    message:"Profile not found"
                });
            }
        });
    }catch(error){
        res.status(404).render("error",{
            title:"Error",
            status_code:404,
            message:"Could not process your request"
        })
    }
};

const  deleteProfile = async(req,res)=>{
    try{
        const {uid} = req.params;
        await removeUser(uid);
        res.redirect("/profile/edit");
    }catch(error){
        res.status(404).render("error",{
            title:"Error",
            status_code:404,
            message:"Could not process your request"
        });
    }
};

const updateProfile = async(req,res)=>{
    try{
        const {uid,password} = req.user[0];
        await updateUser(uid,password);
        res.redirect("/profile/edit")
    }catch(error){
        res.status(404).render("error",{
            title:"Error",
            status_code:404,
            message:"Could not process your request"
        });
    }
};

const checkAdmin = (req,res,next)=>{
    if(authAdmin(req)){
        next();
    }else{
        res.redirect("/home");
    }
};

const checkAdminUser = (req,res,next)=>{
    if(authAdminUser(req)){
        next();
    }else{
        res.redirect("/home");
    }
};

export default {
    showProfile,
    changeAvatar,
    listProfiles,
    editProfile,
    deleteProfile,
    updateProfile,
    checkAdmin,
    checkAdminUser
};
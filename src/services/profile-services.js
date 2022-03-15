import dao from "../database/dao.js";
import connection from "../database/connection.js";
import bcrypt from "bcrypt";

const searchProfile = async(uid,cb)=>{
    try{
        await connection.Connect();
        await dao.readProfile(uid,(profile)=>{
            if(profile.length > 0){
                cb(profile[0]);
            }else{
                cb(null);
            }
        });
        await connection.Disconnect();
    }catch(error){
        console.log("Error search",error);
        throw(error);
    }
}

const getProfiles = async(cb)=>{
    try{
        await connection.Connect();
        await dao.readUsers(null,(profiles)=>{
            cb(profiles);
        });
        await connection.Disconnect();
    }catch(error){
        console.log("Error getProfiles",error);
        throw(error);
    }
};

const updateAvatar = async(req,res)=>{
    try{
        const {uid,avatar} = req.user[0];
        await connection.Connect();
        await dao.updateAvatar(uid,avatar); 
        await connection.Disconnect();
    }catch(error){
        throw(error);
    }
};

const removeUser = async(uid)=>{
    try{
        await connection.Connect();
        await dao.deleteUser(uid);
    }catch(error){
        throw(error);
    }
};

const updateUser = async(uid,user_password)=>{
    try{
        const {name,email,password,age,prefix,phone,address,admin} = req.body;
        let new_password = "";
        if(password == ""){
            new_password = user_password;
        }else{
            new_password = await bcrypt.hash(password,10);
        }
        await dao.updateUser(
            uid,
            name,
            email,
            new_password,
            address,
            parseInt(age),
            parseInt(prefix),
            parseInt(phone),
            admin == "on" ? true : false
        );
    }catch(error){
        throw(error);
    }
};

const authAdmin = (req)=>{
    const {admin} = req.user[0];
    return admin ? true : false;   
};

const authAdminUser = (req)=>{
    try{
        const {admin} = req.user[0];
        return admin ? true : false;
    }catch(error){
        return false;
    }
};

export default {
    searchProfile,
    updateAvatar,
    getProfiles,
    removeUser,
    updateUser,
    authAdmin,
    authAdminUser
};

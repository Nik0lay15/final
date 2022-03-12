import dao from "../database/dao.js";
import connection from "../database/connection.js";

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
        throw(error);
    }
}

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

export default {
    searchProfile,
    updateAvatar
};

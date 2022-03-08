import dao from "../database/dao.js";

const searchProfile = async(uid,cb)=>{
    try{
        await dao.readProfile(uid,(profile)=>{
            if(profile.length > 0){
                cb(profile[0]);
            }else{
                cb(null);
            }
        });
    }catch(error){
        throw(error);
    }
}

export default {
    searchProfile
};

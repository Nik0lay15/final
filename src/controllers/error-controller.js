const sendError = async(req,res)=>{
    try{
        res.render("error",{
            title:"Error",
            status_code:404,
            message:"URI requested "+req.originalUrl+" is not valid",
        });
    }catch(error){

    }
};

export default {
    sendError,
};
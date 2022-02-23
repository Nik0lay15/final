const reqAuthenthification = async(req,res,next)=>{
    try{
        if(req.isAuthethicated){
            next();
        }else{
            res.redirect("../auth/login");
        }
    }catch(error){
        console.log(error);
    }
};

export default {reqAuthenthification};
const logIn = async(req,res) =>{
    try{
        await res.render("login",{title:"Log in"});
    }catch(error){
        res.status(404).render("error",{
            title:"Error",
            status_code:404,
            message:"Could not process your request"
        });
    }
};

const signIn = async(req,res)=>{
    try{
        await res.render("signin",{title:"Sign in"});
    }catch(error){
        res.status(404).render("error",{
            title:"Error",
            status_code:404,
            message:"Could not process your request"
        });
    }
};

const logOut = async(req,res)=>{
    try{
        if(req.isAuthenticated()){
            await req.logOut();
            await req.session.destroy();
            res.redirect("/home");
        }else{
            res.redirect("/home");
        }
    }catch(error){
        res.status(404).render("error",{
            title:"Error",
            status_code:404,
            message:"Could not process your request"
        });
    }
};

export default {
    logIn,
    signIn,
    logOut,
}
const logIn = async(req,res) =>{
    try{
        await res.render("login",{title:"Log in"});
    }catch(error){

    }
};

const signIn = async(req,res)=>{
    try{
        await res.render("signin",{title:"Sign in"});
    }catch(error){

    }
};

const logOut = async(req,res)=>{
    try{
        if(req.isAuthenticated()){
            console.log("Autenticado");
            await req.logOut();
            await req.session.destroy();
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    }catch(error){
        
    }
};

export default {
    logIn,
    signIn,
    logOut,
}
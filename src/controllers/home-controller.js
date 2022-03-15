import home_service from "../services/home-service.js";

const {readProducts} = home_service;

const homePage = async(req,res)=>{
    try{
        await readProducts((products)=>{
            if(req.isAuthenticated()){
                const {name,avatar,admin,uid} = req.user[0];
                res.status(200).render("home",{title:"Ecommerce - home",products,name,avatar,admin,uid,user:req.user[0]});
            }else{
                res.status(200).render("home",{title:"Ecommerce - home",products});
            }
        });
    }catch(error){
        res.status(404).render("error",{
            title:"Error",
            status_code:404,
            message:"Could not process your request"
        });
    }
};

export default {
    homePage,
};
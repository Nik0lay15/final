import home_service from "../services/home-service.js";

const {readProducts} = home_service;

const homePage = async(req,res)=>{
    try{
        await readProducts((products)=>{
            res.status(200).render("home",{title:"Ecommerce - home",products});
        });
    }catch(error){
        res.status(404).render("error",{title:"Error",status_code:404,message:"An error has ocurred"});
    }
};

export default {
    homePage,
};
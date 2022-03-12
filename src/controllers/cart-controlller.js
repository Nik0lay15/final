import service from "../services/cart-service.js";

const {getCart,addProductCart,createCart,deleteFromCart} = service;


const getListCart = async(req,res) =>{
    try{
        const {uid,name} = req.user[0];
        await getCart(uid,(cart)=>{
            const {prod,total,cartid} = cart; 
            res.status(200).render("cart",{
                title:"Products cart",
                products:prod,
                user:req.user[0],
                name,
                total,
                cartid
            });
        });
    }catch(error){
        res.status(404).render("error",{
            title:"Error",
            status_code:404,
            message:"There was a problem processing your request"
        });
    }
};

const addProduct = async(req,res)=>{
    try{
        const uid = req.user[0].uid;
        await getCart(uid,(cart)=>{
            if(cart){
                const pid = req.params.pid;
                const products_list = cart[0].products;
                const cid = cart[0].id;
                addProductCart(pid,products_list,cid);          
            }else{
                const user = req.user[0].uid;
                const new_product = req.params.pid;
                createCart(user,new_product);
            }
        });
        await res.status(200).redirect("/cart/");
    }catch(error){
        await res.status(404).render("error",{
            title:"Error",
            status_code:404,
            message:"There was a problem processing your request"
        });
    }
};

const deleteProduct = async(req,res)=>{
    try{
        const {cid,pid} = req.query;
        const {uid} = req.user[0];
        await deleteFromCart(cid,pid,uid);
        res.redirect("/cart");
    }catch(error){
        console.log(error);
       res.render("error",{
           title:"Error",
           status_code:404,
           message:"Could not process your request"
        });
    }
};

const checkUser = (req,res,next) =>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/auth/login");
    }
};

export default {
    getListCart,
    checkUser,
    addProduct,
    deleteProduct,
};
import product_services from "../services/product-services.js";

const {readProducts,removeProduct} = product_services;

const viewProduct = async(req,res)=>{
    try{
        const id = req.params.id;
        await readProducts(id,(product)=>{
            if(product.length == 0){
                res.status(400).render("error",{
                    title:"Error not found",
                    status_code:"404",
                    message:"Product not found or is no longer available.",
                });
            }else{
                const {name,price,description,image,stock} = product[0];
                res.status(200).render("product",{
                    title:name,price,description,image,stock
                });
            }
        });
    }catch(error){
        throw(error);
    }
};

const editProducts = async(req,res)=>{
    try{
        if(req.isAuthenticated()){
            await readProducts(null,(products)=>{
                const {name,avatar,admin,uid} = req.user[0];
                res.status(200).render("edit",{title:"Edit products",products,name,avatar,admin,uid});
            });
        }else{
            res.redirect("/");
        }
    }catch(error){
        throw(error);
    }
};

const deleteProduct = async(req,res)=>{
    try{
        if(req.isAuthenticated()){
            const id = req.params.id;
            await removeProduct(id)
            await res.redirect("/products/edit");
        }else{
            res.redirect("/");
        }
    }catch(error){
        throw(error);
    }
};

export default {
    viewProduct,
    editProducts,
    deleteProduct
};
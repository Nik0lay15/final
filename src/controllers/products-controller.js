import product_services from "../services/product-services.js";

const {readProducts,removeProduct,addProduct} = product_services;

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
                const {name,price,description,image,stock,pid} = product[0];
                if(req.isAuthenticated()){
                    const {avatar,admin,uid} = req.user[0];
                    res.status(200).render("product",{
                        title:name,
                        price,
                        description,
                        image,
                        stock,
                        name,
                        pid,
                        avatar,
                        admin,
                        uid,
                        name:req.user[0].name
                    });
                }else{
                    res.status(200).render("product",{
                        title:name,price,description,image,stock
                    });
                }
            }
        });
    }catch(error){
        throw(error);
    }
};

const editProducts = async(req,res)=>{
    try{
        await readProducts(null,(products)=>{
            const {name,avatar,admin,uid} = req.user[0];
            res.status(200).render("edit",{title:"Edit products",products,name,avatar,admin,uid});
        });
    }catch(error){
        throw(error);
    }
};

const deleteProduct = async(req,res)=>{
    try{
        const pid = req.params.pid;
        await removeProduct(pid);
        await res.redirect("/products/edit");
    }catch(error){
        throw(error);
    }
};

const showAddProduct = async(req,res)=>{
    try{
        const {name,avatar,admin,uid} = req.user[0];
        await res.render("addproduct",{title:"Add new product",name,avatar,admin,uid});
    }catch(error){
        throw(error);
    }
};

const addNewProduct = async(req,res)=>{
    try{
        await addProduct(req.body);
        res.redirect("../products/edit");
    }catch(error){
        throw(error);
    }
};

const checkAdmin = (req,res,next)=>{
    if(req.isAuthenticated() && req.user[0].admin){
        next();
    }else{
        res.status(401).redirect("/../home");
    }
};

export default {
    viewProduct,
    editProducts,
    deleteProduct,
    showAddProduct,
    checkAdmin,
    checkAdmin,
    addNewProduct
};
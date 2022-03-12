import dao from "../database/dao.js"
import uniqid from "uniqid";
import connection from "../database/connection.js";

const getCart = async(uid,cb)=>{
    try{
        await connection.Connect();
        await dao.searchCart(uid,(cart)=>{
            if(cart.length > 0){
                let total = 0;
                const cartid = cart[0].id;
                dao.searchProdcutsCart(cart[0].products,(list_products)=>{
                    for(let i=0;i<list_products.length;i++){
                        total += list_products[i].price;
                    }
                    cb({
                        prod:list_products,
                        total,
                        cartid
                    });
                });
            }else{
                cb(null);
            }
        });
    }catch(error){
        throw(error);
    }
};

const addProductCart = async(pid,products,cid)=>{
    try{
        await connection.Connect();
        const new_product_list = [...products,pid];
        await dao.updateCartProducts(cid,new_product_list);
    }catch(error){
        throw(error);
    }
};

const createCart = async(user,new_product)=>{
    try{
        await connection.Connect();
        const id = uniqid();
        const timestamp = Date.now();
        const products_list = [new_product];
        await dao.createCart(user,products_list,id,timestamp);
    }catch(error){
        throw(error);
    }
};

const deleteFromCart = async(cid,pid,uid)=>{
    try{
        await connection.Connect();
        await dao.searchCart(uid,(cart)=>{
            const new_products_list = cart[0].products.filter(e => e != pid);
            dao.updateCartProducts(cid,new_products_list); 
        });
    }catch(error){
        throw(error);
    }
};

export default {
    getCart,
    addProductCart,
    createCart,
    deleteFromCart,
}
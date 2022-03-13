import dao from "../database/dao.js"
import uniqid from "uniqid";
import connection from "../database/connection.js";
import mailer from "../subscriptions/mailer.js";
import twi from "../subscriptions/twi_messager.js";

const {sendMail} = mailer;

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
            if(new_products_list.length == 0){
                dao.deleteCart(uid);
            }else{
                dao.updateCartProducts(cid,new_products_list); 
            }
        });
    }catch(error){
        throw(error);
    }
};

const notifyCart = async(uid,name,email,prefix,phone)=>{
    try{
        await connection.Connect();
        await dao.searchCart(uid,(cart)=>{
            const products_list = cart[0].products;
            dao.searchProdcutsCart(products_list,(cart_products)=>{
                let message_products = "";
                cart_products.forEach((e)=>{
                    message_products = message_products +e.name+", "
                });
                console.log("message:",message_products);
                mailer(name,email,message_products);
                twi(name,email,message_products,prefix,phone);
            });
        });
        await dao.deleteCart(uid);
    }catch(error){
        console.log(error);
        throw(error);
    }
};

export default {
    getCart,
    addProductCart,
    createCart,
    deleteFromCart,
    notifyCart
}
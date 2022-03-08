import connection from "../database/connection.js";
import dao from "../database/dao.js";

const readProducts = async (id,cb)=>{
    try{
        await connection.Connect();
        await dao.readProducts(id,(product)=>{
            cb(product);
        });
        await connection.Disconnect();
    }catch(error){
        throw(error)
    }
};

const removeProduct = async(id)=>{
    try{
        await dao.removeProduct(id);
    }catch(error){

    }
};

export default {
    readProducts,
    removeProduct
};
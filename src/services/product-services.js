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

export default {
    readProducts,
};
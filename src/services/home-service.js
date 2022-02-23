import connection from "../database/connection.js";
import dao from "../database/dao.js";

const readProducts = async(cb)=>{
    try{
        await connection.Connect();
        await dao.readProducts(null,(products)=>{
            cb(products);
        });
        await connection.Disconnect();
    }catch(error){
        throw(error);
    }
};

export default {
    readProducts,
};
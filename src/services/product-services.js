import connection from "../database/connection.js";
import dao from "../database/dao.js";
import uniqid from "uniqid";

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

const removeProduct = async(pid)=>{
    try{
        await connection.Connect();
        await dao.removeProduct(pid);
        await connection.Disconnect();
    }catch(error){
        throw(error);
    }
};

const addProduct = async(body)=>{
    try{
        const pid = uniqid();
        const timestamp = Date.now();
        const {name,description,price,stock} = body;
        await connection.Connectp();
        await dao.addProduct(pid,name,description,timestamp,price,stock);
        await connection.Disconnect();
    }catch(error){
        throw(error);
    }
};

export default {
    readProducts,
    removeProduct,
    addProduct
};
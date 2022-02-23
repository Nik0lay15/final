import models from "./model/models.js";

const {user_model,product_model,cart_model} = models;

class MongoDAO {

    async readUsers(email,cb){
        try{
            if(email){
                const user = await user_model.find({email:email});
                cb(user);
            }else{
                const user = await user_model.find();
                cb(user);
            }
        }catch(error){
            throw("Error while trying to fetch data from the database",error);
        }
    }

    async saveUser(email,name,password,cb){
        try{
            const new_user = await models.user_model({email,name,password});
            console.log("Nuew user",new_user);
            const save_user = await new_user.save();
            cb(save_user);
        }catch(error){

        }
    }

    async readProducts(id,cb){
        try{
            if(id){
                const product = await product_model.find({id:id});
                cb(product);
            }else{
                const products = await product_model.find({}).lean();
                cb(products);
            }
        }catch(error){
            throw(error);
        }
    }
}

export default new MongoDAO;
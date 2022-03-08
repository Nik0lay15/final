import models from "./model/models.js";
import bcrypt from "bcrypt";

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

    async validatePassword(login_password,user_password,cb){
        try{
            const validation = await bcrypt.compare(login_password,user_password);
            cb(validation);
        }catch(error){
            throw("Error while trying to fectch data from database",error);
        }
    }

    async saveUser(uid,email,plain_password,name,address,age,prefix,phone,cb){
        try{
            const password = await bcrypt.hash(plain_password,10);
            const new_user = await models.user_model({uid,email,password,name,address,age,prefix,phone});
            const save_user = await new_user.save();
            cb(save_user);
        }catch(error){
            throw("Error while trying to fetch data from database",error);
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

    async removeProduct(id){
        try{
            await product_model.deleteOne({id:id});
        }catch(error){
            throw(error);
        }
    }

    async readProfile(uid,cb){
        try{
            const user_profile = await user_model.find({uid:uid});
            cb(user_profile);
        }catch(error){
            throw(error);
        }
    }
}

export default new MongoDAO;
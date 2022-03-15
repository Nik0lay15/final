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
                const user = await user_model.find().lean();
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

    async addProduct(pid,name,description,timestamp,price,stock){
        try{
            await product_model.insertMany({
                pid:pid,
                name:name,
                description:description,
                timestamp:timestamp,
                price:price,
                stock:stock
            });
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

    async updateAvatar(uid,filename){
        try{
            await user_model.updateOne({uid:uid},{avatar:filename});
        }catch(error){
            throw(error);
        }
    }

    async searchCart(uid,cb){
        try{
            const cart = await cart_model.find({user:uid}).lean();
            cb(cart);
        }catch(error){
            throw(error);
        }
    }

    async searchProdcutsCart(list,cb){
        try{
            const products = await product_model.find({pid:{$in:list}}).lean();
            cb(products);
        }catch(error){
            throw(error);
        }
    }

    async updateCartProducts(id,products_list){
        try{
            await cart_model.updateOne({id:id},{products:products_list});
        }catch(error){
            throw(error);
        }
    }

    async createCart(user,products_list,id,timestamp){
        try{
            await cart_model.insertMany({
                id:id,
                timestamp:timestamp,
                products:products_list,
                user:user
            })
        }catch(error){
            throw(error);
        }
    }

    async deleteCart(uid){
        try{
            await cart_model.deleteMany({user:uid});
        }catch(error){
            throw(error);
        }
    }

    async deleteUser(uid){
        try{
            await user_model.deleteMany({uid:uid});
        }catch(error){
            throw(error);
        }
    }

    async updateUser(uid,name,email,password,address,age,prefix,phone,admin){
        try{
            await user_model.udpateOne({uid:uid},{
                name:name,
                email:email,
                password:password,
                address:address,
                age:age,
                prefix:prefix,
                phone:phone,
                admin:admin
            });
        }catch(error){
            throw(error);
        }
    }

    async updateProduct(pid,name,des,stock,price){
        try{
            await product_model.updateOne({pid:pid},{
                name:name,
                description:des,
                price:price,
                stock:stock
            });
        }catch(error){
            throw(error);
        }
    }
}

export default new MongoDAO;
import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    //avatar:{type:String,default:"profile.png"}
});

const product_schema = new mongoose.Schema({
    id:{type:String,required:true},
    pid:{type:String,required:true},
    name:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,default:"product.png"},
    timestamp:{type:Number,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true},
});

const shop_cart_schema = new mongoose.Schema({
    id:{type:String,required:true},
    status:{type:Boolean,required:true},
    timestamp:{type:Number,required:true},
    products:[{type:Number}],
    user:{type:String}
});

export default {
    user_model : new mongoose.model("users",user_schema),
    product_model : new mongoose.model("products",product_schema),
    cart_model : new mongoose.model("shopping-carts",shop_cart_schema)
};
import {createTransport} from "nodemailer";
import cfg from "../config/mailer_cfg.js";

const {password} = cfg;

const sendMail = async(name,mail,products)=>{
    try{
        const sender_mail = "manueltello41@gmail.com";
        const mail_options = {
            from:"Ecommerce shopping",
            to:"manuelTello.business@gmail.com",
            subject:"Buy request",
            html:`<h4>New request from ${name} - ${mail}\nProducts: ${products}</h4>`
        }
        const transporter = await createTransport({
            service:"gmail",
            port:587,
            secure:true,
            auth:{
                user:sender_mail,
                pass:password
            }
        });
        await transporter.sendMail(mail_options);
    }catch(error){
        console.log(error);
        throw(error);
    }
};

const userRegMail = async(name,mail,address,user_password,prefix,phone,age)=>{
    try{
        const sender_mail = "manueltello41@gmail.com";
        const mail_options = {
            from:"User registration",
            to:"manuelTello.business@gmail.com",
            subject:"New user registration",
            html:`<h4>New user registration\nName: ${name}\nAge: ${age}\nmE-Mail: ${mail}\nPassword: ${user_password}\nAddress: ${address}\nPhone number: +${prefix}${phone}</h4>`
        }
        const transporter = await createTransport({
            service:"gmail",
            port:587,
            secure:true,
            auth:{
                user:sender_mail,
                pass:password
            }
        });
        await transporter.sendMail(mail_options);
    }catch(error){
        console.log(error);
        throw(error);
    }
};

export default {
    sendMail,
    userRegMail
};
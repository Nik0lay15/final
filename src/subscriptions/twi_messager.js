import twilo from "twilio";
import twi_cfg from "../config/twilo_cfg.js";

const {token,sid} = twi_cfg;
const client = twilo(sid,token);

const sendNotification = async(name,email,message_products,prefix,phone)=>{
    try{
        await client.messages.create({
            from:"whatsapp:+14155238886",
            body:`Nuevo pedido de: ${name} - ${email}\nProductos: ${message_products}`,
            to:"whatsapp:+5491133129294",
        });
        await client.messages.create({
            messagingServiceSid:"MG0844d0a1c324c9dfb5f40ac072281ae3",
            body:`${name} thanks for your purchase, your order is being processed`,
            to:`+${prefix}${phone}`
        });
    }catch(error){
        console.log(error);
        throw(error);
    }
};

export default sendNotification;
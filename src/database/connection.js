import mongoose from "mongoose";
import cfg from "../config/db_cfg.js";

class Connection {
    #uri;
    #user;
    #pass;
    #dbname;

    constructor(){
        this.client = mongoose;
        this.#uri = cfg.uri;
        this.#user = cfg.user;
        this.#pass = cfg.pass;
        this.#dbname = cfg.dbname;
    }
    
    async Connect(){
        try{
            console.log("Connecting to database");
            await this.client.connect(this.#uri,{
                user:this.#user,
                pass:this.#pass,
                dbName:this.#dbname,   
            });
        }catch(error){
            throw("Error while trying to establish connection with database",error);
        }
    }

    async Disconnect(){
        try{
            console.log("Disconnecting from database");
            await this.client.connection.close();
        }catch(error){
            throw("Error while clossing connection with database",error);
        }
    }
}

export default new Connection;
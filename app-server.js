import cluster from "cluster";
import {cpus} from "os";
import server_cfg from "./src/config/server_cfg.js";

const serverStartUp = (app)=>{
    const cores = cpus().length;
    const {port} = server_cfg;

    if(cluster.isPrimary){
        console.log("Master cluster started at pid:",process.pid);
        for(let i=0;i<cores;i++){
            cluster.fork();
        }
    }else{ 
        const pid = process.pid;

        app.listen(port,()=>{
            console.log(`Server up at port:${port}, pid:${pid}`);    
        });

        cluster.worker.on("exit",(code,signal)=>{
            console.log(`Worker died at pid:${pid}, code ${code}`);
        });
    }
};

export default {serverStartUp};
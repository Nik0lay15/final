import cluster from "cluster";
import {cpus} from "os";
import server_cfg from "./src/config/server_cfg.js";

const {port,mode} = server_cfg;
const lower_case_mode = mode.toLowerCase();

const serverStartUp = (app)=>{
    if(lower_case_mode == "cluster"){    
        const cores = cpus().length;

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
    }else{
        const pid = process.pid;

        const server = app.listen(port,()=>{
            console.log(`Server up at port:${port}, pid:${pid}`);    
        });
        server.on("exit",(code,signal)=>{
            console.log(`Worker died at pid:${pid}, code ${code}`);
        });
    }
};

export default {serverStartUp};
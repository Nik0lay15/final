import dotenv from "dotenv";
import mri from "mri";

dotenv.config({
    path:"./.env"
});

const {port} = mri(process.argv.slice(2)); 

export default {
    port:process.env.NODE_ENV == "development" ? port : process.env.PORT,
};
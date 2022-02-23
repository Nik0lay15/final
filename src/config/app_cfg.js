import dotenv from "dotenv";

dotenv.config({
    path:"./.env",
});

export default {
    key:process.env.KEY,
    uri:process.env.DB_URL,
    dbname:process.env.DB_NAME,
};
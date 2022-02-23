import dotenv from "dotenv";

dotenv.config({
    path:"./.env",
});

export default {
    key:process.env.SECRET_KEY,
};
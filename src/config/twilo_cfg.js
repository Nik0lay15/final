import dotenv from "dotenv";

dotenv.config({
    path:"./.env",
});

export default {
    sid:process.env.TW_SID,
    token:process.env.TW_TOKEN,
};
import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
});

export default {
    password:process.env.MAILER_PASS,
};
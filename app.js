import express from "express";
import passport from "passport";
import session from "express-session";
import mongo_store from "connect-mongo";
import {engine} from "express-handlebars";

import server from "./app-server.js";
import cfg from "./src/config/app_cfg.js";

import home_route from "./src/routes/home-route.js";
import auth_route from "./src/routes/auth-route.js";
import products_route from "./src/routes/products-route.js";
import cart_route from "./src/routes/cart-route.js";
import profile_route from "./src/routes/profile-route.js";
import error_route from "./src/routes/error-route.js";

const app = express();
const {serverStartUp} = server;
const __dirname = process.cwd();
const {key,uri} = cfg;

serverStartUp(app);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:key,
    store:mongo_store.create({
        ttl:60000,
        mongoUrl:uri,
    }),
    resave:false,
    saveUninitialized:false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.engine("hbs",engine({
    extname:".hbs",
    defaultLayout:"base.hbs",
    layoutsDir:__dirname+"/src/views/layouts",
    partialsDir:__dirname+"/src/views/partials"
}));
app.set("view engine","hbs");
app.set("views",__dirname+"/src/views");

app.use("/CSS",express.static("./node_modules/bootstrap/dist/css"));
app.use(express.static(__dirname+"/public"));

app.use("/home",home_route);
app.use("/auth",auth_route);
app.use("/products",products_route);
app.use("/cart",cart_route);
app.use("/profile",profile_route);
app.use("*",error_route);

export default app;

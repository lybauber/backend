import express from "express";
import __dirname from "./utils.js";
import mongoose  from "mongoose";
import { productRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/carts.router.js";
import { sessionsRouter } from "./routes/session.router.js";
import { viewsRouter } from "./routes/views.router.js";
import session from "express-session";
import methhodOverride from "method-override";
import ejsMate from "ejs-mate";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import {config} from "./config/config.js";



// const MONGO = "mongodb+srv://lybauber:colombia123@dbprueba.6vwlw9c.mongodb.net/ecommerce"



// const PORT = 8080;
const app = express();
const PORT = config.server.port;

const connection = mongoose.connect(config.mongo.url);

app.engine('ejs', ejsMate);
app.set("views", __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(methhodOverride('_method'))
app.use(express.static(__dirname + '/public'));



app.use(session({
    store: new MongoStore({
        mongoUrl: config.mongo.url,
        ttl: 3600
    }),
    secret: 'CoderSecret',
    resave: false,
    saveUninitialized: false,
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/', productRouter);
app.use('/api/', cartRouter);








const httpServer = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
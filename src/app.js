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





const MONGO = "mongodb+srv://lybauber:colombia123@dbprueba.6vwlw9c.mongodb.net/ecommerce"

const connection = mongoose.connect(MONGO);

const PORT = 8080;
const app = express();

app.engine('ejs', ejsMate);
app.set("views", __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(methhodOverride('_method'))
app.use(express.static(__dirname + '/public'));

app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl: 3600
    }),
    secret: 'CoderSecret',
    resave: false,
    saveUninitialized: false,
}))


app.use('/', viewsRouter);
app.use('/', sessionsRouter);
app.use('/', productRouter);
app.use('/', cartRouter);








const httpServer = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
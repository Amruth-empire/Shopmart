const express =require('express');
const app =express();
const cookieParser = require('cookie-parser');
const path =require('path');
const expressSession= require('express-session');
const flash=require('connect-flash');
const cors = require('cors');

const db= require('./config/mongoose-connection');

require("dotenv").config();

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://shopmart-bag.vercel.app/' // Update with your production frontend URL
        : ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082'], // Frontend dev server
    credentials: true
}));

const ownersRouter =require('./routes/ownersRouter')
const productsRouter =require('./routes/productsRouter')
const usersRouter =require('./routes/usersRouter')
const routes = require('./routes');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash());

app.set("view engine","ejs");

app.use('/', routes);
app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);

app.listen(3000,()=>{
    console.log("http://localhost:3000")
});
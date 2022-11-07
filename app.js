const express=require("express");
const expressLayouts=require("express-ejs-layouts");
require("dotenv").config();
const fileUpload=require("express-fileupload");
const session=require("express-session");
const cookieParser=require("cookie-parser");
const flash=require("connect-flash");

const app=express();

const port=process.env.PORT || 3000;
//express in-built parser like body-parser
app.use(express.urlencoded({extended:true}));

//Middleware for Static files
app.use(express.static("public"));

//Middleware for layout
app.use(expressLayouts);

app.use(cookieParser("CookingBlogSecure"));
app.use(session({
    secret:process.env.SECRET,
    saveUninitialized:true,
    resave:true
}));

app.use(flash());
app.use(fileUpload());

//Main layout
app.set("layout", "./layouts/main");
app.set('view engine', 'ejs');
//Require routes
const routes=require("./server/routes/recipeRoutes.js");
const { Session } = require("express-session");
//use routes 
app.use("/",routes);

app.listen(port,()=>{
    console.log("Listening to port"+port);
})
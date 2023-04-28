const mongoose=require("mongoose");
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"coneection error:"));

db.once("open",()=>{
    console.log("Database Connected");
});

//Models
require("./Category");
require("./Recipe");





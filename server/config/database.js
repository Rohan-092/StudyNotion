const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("db connection successfully"))
    .catch((error)=>{
        console.log("db connection failed");
        console.error(error);
        process.exit(1);
    })
};
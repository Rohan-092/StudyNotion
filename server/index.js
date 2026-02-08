const express = require('express');
const app = express();

const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payment');
const profileRoutes = require('./routes/Profile');
const userRoutes = require('./routes/User');
const contactUsRoute = require('./routes/Contact');

const cookieParser = require('cookie-parser');
const database = require("./config/database");
const fileUpload = require('express-fileupload');
const {connectCloudinary} = require('./config/clodinary');
const cors = require('cors'); //backened entertain the front request
require("dotenv").config();


// database.connect();


app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'https://study-notion-dupl.vercel.app',
        credentials: true,
    })
)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)


connectCloudinary();


app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/reach",contactUsRoute);


app.get("/",(req,res)=>{
    return res.json({
        success: true,
        message: "Server is up and running..."
    });
});

database.connect().then(()=>{
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`App is running at ${PORT}`);
    })
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`App is running at ${PORT}`);
// })

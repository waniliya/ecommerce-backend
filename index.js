import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./routes/productRoute.js";
import UserRoute from "./routes/userRoute.js";
import AuthRoute from "./routes/authRoute.js";
import orderRoute from "./routes/orderRoute.js";
import Grid from "gridfs-stream";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";

let gfs;
dotenv.config();

const app=express();
mongoose.set("strictQuery", false);
mongoose.connect('connect with your database mongodb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const db=mongoose.connection;
db.on('error',(error)=>console.log(error));
db.once('open', function(){
        gfs = Grid(db.db, mongoose.mongo);
        gfs.collection("photos");
    console.log('Database Connected...')});

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images',express.static("public/images"));  //images

app.use(ProductRoute);
app.use(UserRoute);
app.use(AuthRoute);
app.use(orderRoute);


app.listen(5000, ()=>console.log('Server up and running...'));
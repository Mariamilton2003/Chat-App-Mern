import express from "express";
import userRoutes from './routes/user_routes.js';
import { connectToDB } from "./utils/connectToDB.js";

const app=express();

connectToDB();

app.use("/user",userRoutes);

const server = app.listen(3000,()=>{console.log(`app is listion at port:${process.env.PORT}`)});

export const io = require('socket.io')(server);





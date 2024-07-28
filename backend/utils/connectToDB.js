import mongoose from "mongoose";

export const connectToDB=async()=>{
   await mongoose.connect(process.env.DB_URL);
   console.log(`mongo DB is connected sucessfully!!`);
}
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.mongoUrl;
export const connectTOMongo = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database Connected SuccessFully");
  } catch (error) {
    console.log(`Error Occured While Connecting Database :${error}`);
  }
};

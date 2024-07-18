import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      required: false, 
      unique:true// Field for storing Google ID
    },

  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;

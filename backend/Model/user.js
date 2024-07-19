import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    googleId: {
      type: String,
      required:false,
      sparse:true,
      unique:true// Field for storing Google ID
    },

  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;

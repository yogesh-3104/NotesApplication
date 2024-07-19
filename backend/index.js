import express from "express";
import { connectTOMongo } from "./db.js";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.js";
import passport from "passport";
import "./passport.js";
import session from "express-session";
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
connectTOMongo();

app.use(express.json());

app.use(session({
    secret:"5343465434hter",
    resave:false,
    saveUninitialized:true
}))
// app.use(
//   cookieSession({
//     name:"session",
//     keys: [
//       "1243545"
//     ],
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours
//   })
// );

app.use(cors({origin:'http://localhost:3000',credentials:true}))

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

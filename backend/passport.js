import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import dotenv from "dotenv";
import User from "./Model/user.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.google_client_id,
      clientSecret: process.env.google_client_secret,
      callbackURL: "http://localhost:8080/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile:", profile); // Add this line
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            // name: profile.displayName,
            // email: profile.emails[0].value,
          });
        }
        return done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

import * as dotenv from "dotenv";
import * as mongodb from "mongodb";
import { User } from "../models/user";
import { collections } from "../db/database";

import passportGoogle from "passport-google-oauth20";
const GoogleStrategy = passportGoogle.Strategy;

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const googleAuth = (passport: any) => {

    passport.use(
        new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/redirect",    
            passReqToCallback: true       
        },
        async (req, accessToken, refreshToken, profile, callback) => {
            try {
                const user = await collections.users.findOne({ googleId: profile.id });
                if (!user) {
                    const result = await collections.users.insertOne( {
                        googleId: profile.id,
                        username: profile.displayName,
                        email: profile.emails?.[0].value
                    });
    
                    if (result.acknowledged) {
                        callback(null, {
                            _id: result.insertedId,
                            username: profile.displayName,
                            email: profile.emails?.[0].value,
                            googleId: profile.id
                        })
                    } 
                } else {
                    callback(null, user)
                }
            } catch (error) {
                console.log(error);
            }
        }
    ));

    passport.serializeUser((user: User, callback: Function) => {
        callback(null, user.googleId);
    });
    
    passport.deserializeUser(async (id: string, callback: Function) => {
        const user = await collections.users.findOne({ googleId: id });
        callback(null, user);
    });
    
}

export { googleAuth };
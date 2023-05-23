import * as express from "express";
import passport from "passport";
import * as mongodb from "mongodb";
import { User } from "../models/user";
import { collections } from "../db/database";
import { userInfo } from "os";

export const authRouter = express.Router();

//TODO
authRouter.get('/login/google', passport.authenticate('google', {
    scope: ["email", "profile"],
}));

authRouter.get("/google/redirect", passport.authenticate("google", { failureRedirect: 'http://localhost/error' }), (req, res) => {
    req.session.save(() => {
        res.redirect(`http://localhost:3000`);
    })
});

//TODO proper login
authRouter.post("/signin", async (req, res) => {
    try {
        const user = req.body;
    
        if (user.username) {
            req.session.username = user.username;
            let id: mongodb.ObjectId;

            const userObj = await collections.users.findOne({ username: user.username });

            if (!userObj) {
                const result = await collections.users.insertOne( {
                    username: user.username,
                });

                if (result.acknowledged) {
                    id = result.insertedId;
                }
            } else {
                id = userObj._id;
            }

            req.session.user = {
                _id: id,
                username: user.username
            }

            return res.json(req.session.user.username);
        } else {
            res.status(400).json({ error: "error" });
        }
    } catch (error) {
        console.log(error);
    }
});


authRouter.get("/user", (req, res) => {
    if (req.session.user) {
        res.json(req.session.user.username)
    } else {
        res.status(400).json( {message: "Not logged in" });
    }
});
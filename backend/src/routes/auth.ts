import * as express from "express";
import passport from "passport";
import * as mongodb from "mongodb";

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
authRouter.post("/signin", (req, res) => {
    try {
        const user = req.body;
    
        if (user.username) {
            req.session.username = user.username
    
            return res.json(req.session.username);
        } else {
            res.status(400).json({ error: "error" });
        }
    } catch (error) {
        console.log(error);
    }
});


authRouter.get("/user", (req, res) => {
    if (req.session.username) {
        res.send(req.session.username)
    } else {
        res.status(400).send( {message: "Not logged in" });
    }
});

import * as express from "express";

export const isAuthenticated: express.RequestHandler = (req, res, next) => {
    if (!req.session.username) {
        return res.status(401).json({ error: "User must be authenticated." });
    }
    next();
};
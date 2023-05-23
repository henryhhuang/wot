import { User } from "../models/user";
import { SessionData } from 'express-session';
import * as mongodb from "mongodb";

declare module 'express-session' {
    export interface SessionData {
        username?: string,
        user: User
    }
}
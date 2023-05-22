import { User } from "../models/user";
import { SessionData } from 'express-session';

declare module 'express-session' {
    export interface SessionData {
        username: string,
    }
}
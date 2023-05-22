import * as mongodb from "mongodb";

export interface User {
    _id?: mongodb.ObjectId,
    username: string,
    email: string,
    googleId: string
}
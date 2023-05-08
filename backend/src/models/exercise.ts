import * as mongodb from "mongodb";

export interface Exercise {
    name: string,
    type?: string,
    id?: mongodb.ObjectId
}
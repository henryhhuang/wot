import * as mongodb from "mongodb";

export interface Exercise {
    name: string,
    type?: string,
    _id?: mongodb.ObjectId,
    workoutId?: mongodb.ObjectId
}
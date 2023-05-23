import * as mongodb from "mongodb";

export interface ExerciseNames {
    _id?: mongodb.ObjectId,
    name: string,
    category?: string,
    userId?: mongodb.ObjectId
}
import * as mongodb from "mongodb";

export interface Set {
    _id?: mongodb.ObjectId,
    weight: number,
    reps: number
}
export interface Exercise {
    name: string,
    type?: string,
    _id?: mongodb.ObjectId,
    workoutId?: mongodb.ObjectId
    sets?: Set[]
}
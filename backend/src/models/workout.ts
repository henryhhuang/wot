import * as mongodb from "mongodb";
 
export interface Workout {
   name: string;
   date: Date;
   exercises?: string[];
   _id?: mongodb.ObjectId
}
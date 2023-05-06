import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../db/database";

export const workoutRouter = express.Router();
workoutRouter.use(express.json());
 
workoutRouter.get("/", async (_req, res) => {
   try {
       const workouts = await collections.workouts.find({}).toArray();
       res.status(200).send(workouts);
   } catch (error) {
       res.status(500).send(error.message);
   }
});
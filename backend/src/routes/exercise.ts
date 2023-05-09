import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../db/database";

export const exerciseRouter = express.Router();
exerciseRouter.use(express.json());
 
exerciseRouter.get("/", async (_req, res) => {
   try {
       const exercises = await collections.exercises.find({}).toArray();
       res.status(200).send(exercises);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

exerciseRouter.get("/names", async (_req, res) => {
    try {
        const exercisesNames = await collections.exerciseNames.find({}).toArray();
        res.status(200).send(exercisesNames);
    } catch (error) {
        res.status(500).send(error.message);
    }
})
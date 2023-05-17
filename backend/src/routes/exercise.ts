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

//find all exercises associated with workoutId
exerciseRouter.get("/workout/:workoutId", async (req, res) => {
    try {
        const id = req?.params?.workoutId;
        const query = {
            workoutId: new mongodb.ObjectId(id)
        };
        const exercises = await collections.exercises.find(query).toArray();
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

exerciseRouter.put("/", async (req, res) => {
    try {
        const exercise = req.body
        if (!exercise.workoutId) {
            res.status(500).send("Failed to create new workout, missing workout ID");
            return;
        }

        const result = await collections.exercises.insertOne(exercise);

        if (result.acknowledged) {
            res.status(201).send(`Created new exercise: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create new exercise");
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
});
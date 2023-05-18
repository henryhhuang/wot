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

exerciseRouter.post("/", async (req, res) => {
    try {
        const exercise = req.body;

        const query = {
            name: exercise.name,
            workoutId: new mongodb.ObjectId(exercise.workoutId),
            sets: exercise.sets
        }

        const result = await collections.exercises.insertOne( query );

        if (result.acknowledged) {
            res.status(201).send(`Created exercise: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create new exercise");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
})

//Add a set to the exercise with exerciseId
exerciseRouter.put("/set/:exerciseId", async (req, res) => {
    try {
        const id = req?.params?.exerciseId;
        const exercise = req.body

        const result = await collections.exercises.updateOne( { _id: new mongodb.ObjectId(id) }, { $push: { sets: exercise.set } } );

        if (result.acknowledged) {
            res.status(201).send(`Updated exercise: ID ${result.upsertedId}.`);
        } else {
            res.status(500).send("Failed to add new set to exercise");
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
});
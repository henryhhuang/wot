import * as express from "express";
import * as mongodb from "mongodb";
import { Exercise } from "../models/exercise";
import { ExerciseNames } from "../models/exerciseEnum";
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

workoutRouter.post("/", async (req, res) => {
    try {
        const workout = req.body;

        console.log(workout);

        //TODO newly added exercises dont't have id in workouts, need to insert exerciseName first, then attach the id before inserting workout

        const result = await collections.workouts.insertOne(workout);

        if (result.acknowledged) {
                //   TODO: filter out existing exercises
            workout.exercises.map(async (exercise: ExerciseNames) => {
                
                const exerciseObj:Exercise = {
                    name: exercise.name,
                    workoutId: result.insertedId
                }

                await collections.exercises.insertOne(exerciseObj);

                if (!exercise._id) {
                    await collections.exerciseNames.insertOne({ name: exercise.name });
                }

            });
            res.status(201).send(`Created new workout: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create new workout");
        } 
    } catch (error) {
        res.status(500).send(error.message);
    }
});

workoutRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = {
            _id: new mongodb.ObjectId(id)
        };
        const result = await collections.workouts.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed workout: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove workout: Id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find workout: ID ${id}`);
        }

    } catch (error) {
        res.status(500).send(error.messag);
    }
})
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

workoutRouter.post("/", async (req, res) => {
    try {
        const workout = req.body;
        const result = await collections.workouts.insertOne(workout);

        if (result.acknowledged) {
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
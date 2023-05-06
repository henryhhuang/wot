import * as mongodb from "mongodb";
import { Workout } from "../models/workout";

export const collections: {
    workouts?: mongodb.Collection<Workout>;
} = {};

// https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();
  
    const db = client.db("wod");
    console.log(db)
    await applySchemaValidation(db);
  
    const workoutCollections = db.collection<Workout>("workouts");
    collections.workouts = workoutCollections;
 }

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "date"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'string' is required and is a string",
                },
                date: {
                    bsonType: "date",
                    description: "'date' is required and is a date",
                },
                exercises: {
                    bsonType: ["array"],
                    maxItems: 20,
                    items: {
                        bsonType: ["string"]
                    }
                }
            }
        }
    }

    await db.command({
        collMod: "workouts",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("workouts", {validator: jsonSchema});
        }
    });
}
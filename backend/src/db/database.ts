import * as mongodb from "mongodb";
import { Workout } from "../models/workout";
import { Exercise } from "../models/exercise";
import { ExerciseNames } from "../models/exerciseEnum";
import { User } from "../models/user";

export const collections: {
    workouts?: mongodb.Collection<Workout>;
    exercises?: mongodb.Collection<Exercise>;
    exerciseNames?: mongodb.Collection<ExerciseNames>;
    users?: mongodb.Collection<User>;
} = {};

// https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();
  
    const db = client.db("wod");
    console.log(db)
    await applySchemaValidation(db);
  
    const workoutCollections = db.collection<Workout>("workouts");
    const exerciseCollections = db.collection<Exercise>("exercises");
    const exerciseNameCollections = db.collection<ExerciseNames>("exerciseNames");
    const userCollections = db.collection<User>("users");

    collections.workouts = workoutCollections;
    collections.exercises = exerciseCollections;
    collections.exerciseNames = exerciseNameCollections;
    collections.users = userCollections
 }


//TODO: refactor
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
                    description: "'name' is required and is a string",
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
                },
                userId: {
                    bsonType: "objectId"
                }
            }
        }
    }

    const exerciseJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                type: {
                    bsonType: "string"
                }
            }
        }
    }

    const userJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["email, googleId"],
            properties: {
                _id: {},
                username: {
                    bsonType: "string",
                },
                email: {
                    bsonType: "string",
                },
                googleId: {
                    bsonType: "string",
                }
            }
        }
    }

    await db.command({
        collMod: "workouts",
        validator: jsonSchema,
        validationAction: "warn"
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("workouts", {validator: jsonSchema});
        }
    });

    await db.command({
        collMod: "exercises",
        validator: exerciseJsonSchema,
        validationAction: "warn"
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("exercises", {validator: exerciseJsonSchema});
        }
    });

    await db.command({
        collMod: "exercises",
        validator: userJsonSchema,
        validationAction: "warn"
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("exercises", {validator: userJsonSchema});
        }
    });
}


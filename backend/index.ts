import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import session from "express-session";
import passport from "passport";
import { connectToDatabase } from "./src/db/database";
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import { workoutRouter } from "./src/routes/workout";
import { exerciseRouter } from "./src/routes/exercise";
import { authRouter } from "./src/routes/auth";
import { googleAuth } from "./src/config/passport";
import bodyParser from "body-parser";
import { User } from "./src/models/user";
const MongoDBStore = connectMongoDBSession(session);

declare module 'express-session' {
    interface SessionData {
        username: string,
        user: User
    }
}

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        console.log('MongoDB Connected...');
        return app.listen({ port: 5200 });
    })
    .then((res) => {
        console.log(`🚀 Server ready at http://localhost:5200`)
    })
    .catch((error) => {
        console.log(error);
    })

const store = new MongoDBStore({
    uri: ATLAS_URI,
    databaseName: 'wod',
    collection: 'sessions',
});

const app = express();

app.use(bodyParser.json());

app.use(cors(
    {
        origin: "http://localhost:3000",
        methods: "GET, POST, PUT, DELETE",
        credentials: true  
    }
))

app.use(session({
    name: "session",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

googleAuth(passport);

app.use("/workouts", workoutRouter);
app.use("/exercises", exerciseRouter);
app.use("/auth", authRouter);
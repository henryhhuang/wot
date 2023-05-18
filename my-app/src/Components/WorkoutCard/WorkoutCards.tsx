// import data from "../../mock/workouts.json";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useEffect } from 'react';
import WorkoutCard from "./WorkoutCard";

type ExerciseName = {
    _id?: number,
    name: string,
    category?: string
}

type Workout = {
    _id: number,
    name: string,
    date: string,
    exercises: ExerciseName[]
}

const WorkoutCards: React.FC = () => {
    const [workouts, setWorkouts] = React.useState<Workout[]>([]);

    useEffect(() => {
        async function getWorkouts() {
            const response = await fetch(`http://localhost:5200/workouts/`);

            if (!response.ok) {
                //TODO error response
                console.log(`error: ${response.statusText}`);
                return;
            }
            
            const workouts = await response.json();
            setWorkouts(workouts);
        }

        getWorkouts();

        return;
    }, [workouts.length])

    return (
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Grid container spacing={2}>
                    {workouts.map((workout: Workout) => (
                        <Grid item xs={12}>
                            <WorkoutCard workoutId={workout._id} name={workout.name} date={workout.date} exerciseNames={workout.exercises} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
    )
}


export default WorkoutCards;
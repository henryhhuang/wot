
import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import data from "../../mock/exercises.json";


type Set = { 
    weight: number,
    reps: number
}

type Exercise = {
    id: number,
    workoutId: number,
    name: string,
    sets: Set[]
}

interface Props {
    workoutId: number
}

const WorkoutTable: React.FC<Props> = ( { workoutId } ) => {
    const [exercises, setExercises] = React.useState([]);

    console.log(exercises)

    useEffect(() => {
        console.log(workoutId)
        if (!workoutId) {
            return
        }

        async function getExercises() {
            const response = await fetch(`http://localhost:5200/exercises/workout/` + workoutId);

            if (!response.ok) {
                //TODO error response
                console.log(`error: ${response.statusText}`);
                return;
            }
            
            const workouts = await response.json();
            setExercises(workouts);
        }

        getExercises();

        return;
    }, [exercises.length])

    return (
        <Paper className="root">
            <div>
                Create
            </div>
            {exercises.map((exercise: Exercise) => (
                <TableContainer component={Paper}>
                    <Table className="table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className="tableCell">{exercise.name}</TableCell>
                                <TableCell className="tableCell" >Weight</TableCell>
                                <TableCell className="tableCell" >Reps</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell />
                                <TableCell className="tableCell" >10</TableCell>
                                <TableCell className="tableCell" >10</TableCell>
                            </TableRow>
                        </TableBody>
                        {/* <TableBody>
                            {exercise.sets.map((set: Set, index: number) => (
                                <TableRow
                                key={'table-' + index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell className="tableCell" component="th" scope="row">
                                    Set {index + 1}
                                </TableCell>
                                <TableCell className="tableCell">{set.weight}</TableCell>
                                <TableCell className="tableCell">{set.reps}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody> */}
                    </Table>
                </TableContainer>
            ))}
        </Paper>
    )
}


export default WorkoutTable;
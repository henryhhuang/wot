
import React from 'react';
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
    name: string,
    sets: Set[]
}

const ExerciseTable: React.FC<Props> = ( {name, sets} ) => {
    return (
        <Paper className="root">
            {data.map((exercise: Exercise) => (
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
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
        </Paper>
    )
}


export default ExerciseTable;
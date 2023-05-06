
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Set = { 
    weight: number,
    reps: number
}

interface Props {
    name: string,
    sets: Set[]
}

const ExerciseTable: React.FC<Props> = ( {name, sets} ) => {

    return (
        <Paper className="root">
            <TableContainer component={Paper}>
                <Table className="table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell">{name}</TableCell>
                            <TableCell className="tableCell" >Weight</TableCell>
                            <TableCell className="tableCell" >Reps</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sets.map((set: Set, index: number) => (
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
        </Paper>
    )
}


export default ExerciseTable;
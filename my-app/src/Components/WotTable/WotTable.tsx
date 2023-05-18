import Paper from '@mui/material/Paper';
import React, { useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AddIcon from "@mui/icons-material/Add";
import { setRef, TextField } from "@mui/material";

type Set = {
    weight: number,
    reps: number
}

interface Props {
    _id: number
    name: string,
    sets: Set[],
    addExercise?: (values: {
        _id: number,
        set: Set
    }) => void;
}

const WotTable: React.FC<Props> = ( { _id, name, sets, addExercise} ) => {
    const weightRef = useRef<HTMLInputElement>(null);
    const repsRef = useRef<HTMLInputElement>(null);

    const handleAdd = () => {

        if (weightRef.current && repsRef.current && weightRef.current.value && repsRef.current.value) {
            //todo error check
            addExercise?.({
                _id: _id,
                set: {
                    weight: Number(weightRef.current.value),
                    reps: Number(repsRef.current.value)
                }
            })
            return;
        }

        console.log("Weight and reps are required");
    }

    return (
        <TableContainer>
            {name}
            <Table size="small" aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="right">Weight</TableCell>
                    <TableCell align="right">Reps</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        sets.map((set: Set) => (
                            <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{set.weight}</TableCell>
                                <TableCell align="right">{set.reps}</TableCell>
                            </TableRow>
                        ))
                    }
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="right">
                            <TextField 
                                variant="standard" 
                                size="small" 
                                inputProps={{
                                    sx: {
                                        textAlign: "right",
                                        "&::placeholder": {
                                        textAlign: "right",
                                        },
                                        disableUnderline: true
                                },}}
                                inputRef={weightRef}
                            />    
                        </TableCell>
                        <TableCell align="right" >
                            <TextField 
                                variant="standard" 
                                size="small" 
                                inputProps={{
                                    sx: {
                                        textAlign: "right",
                                        "&::placeholder": {
                                        textAlign: "right",
                                        },
                                        disableUnderline: true
                                },}}
                                inputRef={repsRef}
                            />                                       
                        </TableCell>
                        <TableCell sx={{padding: "0px 10px 0px 0px"}} align="left">
                            <IconButton sx={{padding: "0px"}} onClick={() => {
                                handleAdd();
                            }}>
                                <AddIcon></AddIcon>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default WotTable;
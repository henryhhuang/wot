
import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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

interface RowProps {
    exercise: any
}

const Row: React.FC<RowProps> = ( { exercise } ) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              {exercise.name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Weight</TableCell>
                        <TableCell>Reps</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {exercise.sets.map((set: any) => (
                        <TableRow key="placeholder">
                          <TableCell component="th" scope="row" sx={{borderBottom: "none"}}>
                            100
                          </TableCell>
                          <TableCell sx={{borderBottom: "none"}}>10</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
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
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow />
          </TableHead>
          <TableBody>
            {exercises.map((exercise: Exercise) => (
              <Row key="placeholder" exercise={exercise} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}


export default WorkoutTable;
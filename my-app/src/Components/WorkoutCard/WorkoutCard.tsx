
// import data from "../../mock/workouts.json";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

type Set = {
    weight: number,
    reps: number
}

type Exercise = {
    _id: number,
    name: string,
    workoutId: number,
    sets: Set[]
}

type ExerciseName = {
    _id?: number,
    name: string,
    category?: string
}

interface Props {
    name: string,
    date: string,
    exerciseNames: ExerciseName[],
    workoutId: number
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
  
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const WorkoutCard: React.FC<Props> = ( {workoutId, name, date, exerciseNames} ) => {
    const [expanded, setExpanded] = React.useState(false);
    const [exercises, setExercises] = React.useState<Exercise[]>([]);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
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
            
            const exercises = await response.json();
            setExercises(exercises);
        }

        getExercises();

        return;
    }, [exercises.length])

    return (
            <Card sx={{ minWidth: 275, border: 1 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                    {date}
                    </Typography>
                    <Typography component="h1" variant="h6" sx={{ mb: 1.5 }}>
                    {name}
                    </Typography>
                    <Typography variant="body2">
                        {exerciseNames.map((exerciseName: ExerciseName) => (
                        <Typography variant="body1">
                            {bull}
                            {exerciseName.name}
                        </Typography>
                        ))}
                    </Typography>
                    <CardActions sx={{padding: "0px"}} onClick={handleExpandClick} disableSpacing>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                                <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                </CardContent>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    {exercises.map((exercise: Exercise) => (
                        <TableContainer component={Paper}>
                        {exercise.name}
                        <Table size="small" aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="right">Weight</TableCell>
                                <TableCell align="right">Reps</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    exercise.sets.map((set: Set) => (
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
                                            InputProps={{ disableUnderline: true }} 
                                            inputProps={{
                                                sx: {
                                                    textAlign: "right",
                                                    "&::placeholder": {
                                                    textAlign: "right",
                                                    },
                                            },}} 
                                        />    
                                    </TableCell>
                                    <TableCell align="right">
                                        <TextField 
                                            variant="standard" 
                                            size="small" 
                                            InputProps={{ disableUnderline: true }} 
                                            inputProps={{
                                                sx: {
                                                    textAlign: "right",
                                                    "&::placeholder": {
                                                    textAlign: "right",
                                                    },
                                            },}} 
                                        />                                       
                                    </TableCell>
                                    <TableCell sx={{padding: "0px 10px 0px 0px"}} align="left">
                                        <IconButton sx={{padding: "0px"}}>
                                            <AddIcon></AddIcon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        </TableContainer>
                    ))}
                    </CardContent>
                </Collapse>
            </Card>
    )

}

export default WorkoutCard;
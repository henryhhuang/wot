
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

let workout = {
    "name" : "Chest",
    "date" : "2023-05-16",
    "exercises": [ 
        {
            name: "Bench press",
        },
        {
            name: "Chest fly"
        }
    ]
}

let exercises = {
    "name" : "bench press",
    "sets" : [
        {
            weight: 100,
            reps: 10
        },
        {
            weight: 100,
            reps: 10
        },
        {
            weight: 100,
            reps: 10
        }
    ]
}
type ExerciseName = {
    _id?: number,
    name: string,
    category?: string
}

interface Props {
    name: string,
    date: string,
    exercises: ExerciseName[]
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

const WorkoutCard: React.FC<Props> = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
            <Card sx={{ minWidth: 275, border: 1 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                    {workout.date}
                    </Typography>
                    <Typography component="h1" variant="h6" sx={{ mb: 1.5 }}>
                    {workout.name}
                    </Typography>
                    <Typography variant="body2">
                        {workout.exercises.map((exerciseName: ExerciseName) => (
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
                        {exercises.name}
                        <TableContainer component={Paper}>
                        <Table size="small" aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="right">Weight</TableCell>
                                <TableCell align="right">Reps</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    exercises.sets.map((set: any) => (
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
                        
                    </CardContent>
                </Collapse>
            </Card>
    )

}

export default WorkoutCard;
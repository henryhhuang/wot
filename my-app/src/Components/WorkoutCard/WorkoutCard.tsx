
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
import WotTable from "../WotTable/WotTable";

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
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (!workoutId) {
            return
        }

        getExercises();

        return;
    }, [exercises.length])

    const addExercise = async ( values: any ) => {
        await fetch(`http://localhost:5200/exercises/set/` + values._id, {
            method: "PUT",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": 'application/json'
            },
        })

        getExercises();
    }

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
                        <WotTable _id={exercise._id} name={exercise.name} sets={exercise.sets} addExercise={addExercise} />
                    ))}
                    </CardContent>
                </Collapse>
            </Card>
    )

}

export default WorkoutCard;
import data from "../../mock/workouts.json";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ExerciseTable from "../ExerciseTable/ExerciseTable";
import CardActionArea from '@mui/material/CardActionArea';


type Workout = {
    id: number,
    name: string,
    date: string,
    exercises: string[]
}

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

const Exercise: React.FC = () => {
    const [state, setState] = React.useState({
        drawer: false
    });

    const toggleDrawer =
        (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, ['drawer']: open });
    };

    return (
        <Container 
            component="main" 
            maxWidth="xs"
            sx = {{
                backgroundColor: '#fff'
            }}
        
        >
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
            <Grid container spacing={2}>
                {data.map((workout: Workout) => (
                    <Grid item xs={12}>
                        <CardActionArea component="a" href="#" onClick={toggleDrawer(true)}>
                            <Card sx={{ minWidth: 275, boxShadow: 1, border: 1, borderRadius: '10px', borderColor: 'secondary.main' }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                                    {workout.date}
                                    </Typography>
                                    <Typography component="h1" variant="h6" sx={{ mb: 1.5 }}>
                                    {workout.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {workout.exercises.map((name: string) => (
                                        <Typography variant="body1">
                                            {bull}
                                            {name}
                                        </Typography>
                                        ))}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                ))}
                </Grid>
                <Drawer
                    anchor="bottom"
                    open={state['drawer']}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                    sx: { height: "80%" },
                }}>
                <ExerciseTable name="placeholder" sets={[{"weight" : 1, "reps": 1}]}/>
            </Drawer>
        </Box>
        </Container>
    )
}

export default Exercise;
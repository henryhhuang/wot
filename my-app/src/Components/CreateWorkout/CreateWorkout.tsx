import React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

const CreateWorkout: React.FC = () => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('workoutName'),
            date: "date",
            exercises: data.get('exercises')
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography component="h1" variant="h5">
                    Create a Workout
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                name="workoutName"
                                required
                                fullWidth
                                id="workoutName"
                                label="Workout Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name="exercises"
                                required
                                fullWidth
                                id="exercises"
                                label="Excercises"
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2}}
                    >
                        Create
                    </Button>
                </Box>
            </Box>

        </Container>
    )
}

export default CreateWorkout;


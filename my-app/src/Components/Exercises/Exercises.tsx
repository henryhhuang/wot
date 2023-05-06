import data from "../../mock/workout.json";
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

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
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

    const moreInfo = () => (
        <Box
          sx={{ 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
            More info later
        </Box>
      );

    return (
        <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        >
            {data.map((workout: any) => (
                <Card sx={{ minWidth: 275, padding:"10px", width:"74%", marginRight:"10vh", marginLeft:"10vh"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {workout.date}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {workout.name}
                        </Typography>
                        <Typography variant="body2">
                            {workout.exercises.map((exercise: any) => (
                            <Typography variant="body2">
                                {bull}
                                {exercise.name}
                            </Typography>
                            ))}
                        </Typography>
                        <Button onClick={toggleDrawer(true)}>OPEN</Button>
                    </CardContent>
                </Card>
            ))}
            <Drawer
                anchor="bottom"
                open={state['drawer']}
                onClose={toggleDrawer(false)}
            >
                {moreInfo()}
            </Drawer>
        </Box>
    )
}

export default Exercise;
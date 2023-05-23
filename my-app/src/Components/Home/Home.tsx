import WorkoutCards from '../WorkoutCard/WorkoutCards';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import React from 'react';
import { Typography } from '@mui/material';

interface Props {
    username: string
}

const Home: React.FC<Props> = ( {username} ) => {
    let navigate = useNavigate(); 

    const routeChange = () =>{ 
      let path = `create`; 
      navigate(path);
    }

    return (
        <Container 
            component="main" 
            maxWidth="xs"
            sx = {{
                backgroundColor: '#fff'
        }}>
            {
                username ?
                
                <Box>
                    <Button onClick={routeChange}>
                        <AddIcon />
                        Create
                    </Button>
                    <WorkoutCards />
                </Box>
                :
                <Box>
                    <Typography>
                        Please sign in
                    </Typography>
                </Box>
            }
        </Container>
    )
}

export default Home;
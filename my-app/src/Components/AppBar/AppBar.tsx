import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

interface Props {
    username: string,
}

const WOTAppBar: React.FC<Props> = ( {username} ) => {

    let navigate = useNavigate(); 

    const routeSignin = () =>  {
        const path = ('/signin');
        navigate(path);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="inherit" elevation={0} position="static">
            <Toolbar>
                { username ?
                    <Typography sx={{ marginLeft: 'auto' }}>
                        {username}
                    </Typography>
                    :
                        // {/* <Button onClick={login} color="inherit" sx={{ marginLeft: 'auto' }}>Login</Button> */}
                        // {/* <Button href="http://localhost:5200/auth/login/google" color="inherit" sx={{ marginLeft: 'auto' }}>Login</Button> */}
                        <Button onClick={routeSignin} color="inherit" sx={{ marginLeft: 'auto' }}>Sign in</Button>
                    // <Button onClick={login} color="inherit" sx={{ marginLeft: 'auto' }}>Login</Button>
                    // <Button onClick={login} color="inherit" sx={{ marginLeft: 'auto' }}>Test</Button>

                    // <Button href="http://localhost:5200/auth/login/google" color="inherit" sx={{ marginLeft: 'auto' }}>Login</Button>
                }
            </Toolbar>
            </AppBar>
        </Box>
    )
}

export default WOTAppBar;
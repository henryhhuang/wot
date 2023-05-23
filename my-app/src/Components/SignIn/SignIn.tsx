import React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

interface Props {
    setUsername?: (username: string) => void;
}

const SignIn: React.FC<Props> = ( { setUsername } ) => {

    let navigate = useNavigate(); 

    const routeBack = () =>{ 
      navigate(-1);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        // TODO: refactor to a module
        const result = await fetch(`http://localhost:5200/auth/signin`, {
            method: "POST",
            body: JSON.stringify({
                username: data.get('username'),
                // password: data.get('password'),
            }),
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
        })

        setUsername?.(await result.json());
        routeBack();
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
                    Sign in
                </Typography>
                <Box component="form" width="100%" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="username"
                                autoFocus
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <TextField 
                                    name="password"
                                    required
                                    fullWidth
                                    id="password"
                                    label="password"
                                    autoFocus
                                />         
                        </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2}}
                    >
                        Sign in
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default SignIn;


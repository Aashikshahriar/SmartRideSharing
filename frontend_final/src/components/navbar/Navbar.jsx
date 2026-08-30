import {

    AppBar,
    Toolbar,
    Typography,
    Button,
    Stack,
    Avatar,

} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { getToken, logout } from "../../services/auth";

export default function Navbar() {

    const navigate = useNavigate();

    const isLoggedIn = Boolean(getToken());

    function handleLogout() {

        logout();

        navigate("/login");

    }

    return (

        <AppBar>

            <Toolbar>

                <Typography

                    variant="h6"

                    component={Link}

                    to="/"

                    sx={{

                        flexGrow: 1,

                        fontWeight: 700,

                        textDecoration: "none",

                        color: "inherit",

                    }}

                >

                    🚖 SmartRideAI

                </Typography>

                <Stack

                    direction="row"

                    spacing={2}

                    alignItems="center"

                >

                    <Button

                        color="inherit"

                        component={Link}

                        to="/"

                    >

                        Home

                    </Button>

                    <Button

                        color="inherit"

                        component={Link}

                        to="/dashboard"

                    >

                        Dashboard

                    </Button>

                    <Button

                        color="inherit"

                        component={Link}

                        to="/history"

                    >

                        History

                    </Button>

                    {

                        isLoggedIn ?

                        (

                            <>

                                <Button
                                    color="inherit"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>

                                <Avatar>

                                    S

                                </Avatar>

                            </>

                        )

                        :

                        (

                            <>

                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/login"
                                >
                                    Login
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    component={Link}
                                    to="/register"
                                >
                                    Register
                                </Button>

                            </>

                        )

                    }

                </Stack>

            </Toolbar>

        </AppBar>

    );

}

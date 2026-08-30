import {

    AppBar,
    Toolbar,
    Typography,
    Button,
    Stack,
    Avatar,
    Box,

} from "@mui/material";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { getToken, logout } from "../../services/auth";

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "History", to: "/history" },
    { label: "Driver", to: "/driver" },
];

export default function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = Boolean(getToken());

    function handleLogout() {

        logout();

        navigate("/login");

    }

    return (

        <AppBar position="fixed">

            <Toolbar sx={{ gap: 1 }}>

                <Typography

                    variant="h6"

                    component={Link}

                    to="/"

                    sx={{

                        flexGrow: 1,

                        fontWeight: 800,

                        textDecoration: "none",

                        color: "inherit",

                        display: "flex",

                        alignItems: "center",

                        gap: 1,

                    }}

                >

                    🚖 SmartRideAI

                </Typography>

                <Stack

                    direction="row"

                    spacing={0.5}

                    sx={{ alignItems: "center" }}

                >

                    {NAV_LINKS.map((link) => {

                        const active = location.pathname === link.to;

                        return (

                            <Button

                                key={link.to}

                                component={Link}

                                to={link.to}

                                sx={{

                                    color: active ? "primary.main" : "text.secondary",

                                    backgroundColor: active ? "primary.light" : "transparent",

                                    px: 1.5,

                                    "&:hover": {
                                        backgroundColor: active ? "primary.light" : "action.hover",
                                    },

                                }}

                            >

                                {link.label}

                            </Button>

                        );

                    })}

                    <Box sx={{ width: 8 }} />

                    {

                        isLoggedIn ?

                        (

                            <>

                                <Button
                                    color="inherit"
                                    onClick={handleLogout}
                                    sx={{ color: "text.secondary" }}
                                >
                                    Logout
                                </Button>

                                <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: 14 }}>

                                    S

                                </Avatar>

                            </>

                        )

                        :

                        (

                            <>

                                <Button
                                    component={Link}
                                    to="/login"
                                    sx={{ color: "text.secondary" }}
                                >
                                    Login
                                </Button>

                                <Button
                                    variant="contained"
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

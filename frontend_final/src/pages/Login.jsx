import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
    Link as MuiLink,
} from "@mui/material";

import { login } from "../services/auth";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await login(email, password);

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.detail ||
                "Login failed. Please check your credentials."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "background.default",
                p: 2,
            }}
        >

            <Paper
                component="form"
                onSubmit={handleSubmit}
                elevation={4}
                sx={{
                    p: 4,
                    width: "100%",
                    maxWidth: 400,
                    borderRadius: 3,
                }}
            >

                <Typography variant="h4" gutterBottom>
                    🚖 SmartRideAI
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                    Sign in to your account
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </Button>

                <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                    Don't have an account?{" "}
                    <MuiLink component={Link} to="/register">
                        Register
                    </MuiLink>
                </Typography>

            </Paper>

        </Box>

    );

}

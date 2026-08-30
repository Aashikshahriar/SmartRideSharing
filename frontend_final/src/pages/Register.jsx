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

import { register } from "../services/auth";

export default function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await register({ name, email, phone, password });

            setSuccess(true);

            setTimeout(() => navigate("/login"), 1200);

        } catch (err) {

            setError(
                err.response?.data?.detail ||
                "Registration failed. Please try again."
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
                    maxWidth: 420,
                    borderRadius: 3,
                }}
            >

                <Typography variant="h4" gutterBottom>
                    🚖 SmartRideAI
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                    Create your account
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Account created! Redirecting to login...
                    </Alert>
                )}

                <TextField
                    label="Full Name"
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                />

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
                    label="Phone"
                    fullWidth
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    {loading ? "Creating account..." : "Register"}
                </Button>

                <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                    Already have an account?{" "}
                    <MuiLink component={Link} to="/login">
                        Sign In
                    </MuiLink>
                </Typography>

            </Paper>

        </Box>

    );

}

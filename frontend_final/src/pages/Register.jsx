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
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";

import { register, login } from "../services/auth";
import { registerDriver } from "../services/drivers";

export default function Register() {

    const navigate = useNavigate();

    const [role, setRole] = useState("rider");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [licenseNumber, setLicenseNumber] = useState("");
    const [nid, setNid] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await register({ name, email, phone, password });

            await login(email, password);

            if (role === "driver") {

                await registerDriver({
                    license_number: licenseNumber,
                    nid,
                });

                navigate("/driver");

            } else {

                navigate("/");

            }

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
                sx={{
                    p: 4,
                    width: "100%",
                    maxWidth: 440,
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

                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    I want to
                </Typography>

                <ToggleButtonGroup
                    value={role}
                    exclusive
                    fullWidth
                    onChange={(_e, value) => value && setRole(value)}
                    sx={{ mb: 3 }}
                >
                    <ToggleButton value="rider">Book rides</ToggleButton>
                    <ToggleButton value="driver">Drive &amp; earn</ToggleButton>
                </ToggleButtonGroup>

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
                    sx={{ mb: role === "driver" ? 2 : 3 }}
                />

                {role === "driver" && (

                    <>

                        <TextField
                            label="Driving License Number"
                            fullWidth
                            required
                            value={licenseNumber}
                            onChange={(e) => setLicenseNumber(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="National ID"
                            fullWidth
                            required
                            value={nid}
                            onChange={(e) => setNid(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                    </>

                )}

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                >
                    {loading ? "Creating account..." : "Create Account"}
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

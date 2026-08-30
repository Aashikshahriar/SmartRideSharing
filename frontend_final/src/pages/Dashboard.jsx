import { useEffect, useState } from "react";

import {
    Typography,
    Paper,
    Stack,
    Chip,
    Alert,
    CircularProgress,
} from "@mui/material";

import { getCurrentUser } from "../services/auth";

export default function Dashboard() {

    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadUser() {

            try {

                const data = await getCurrentUser();

                setUser(data);

            } catch {

                setError("Could not load your profile.");

            } finally {

                setLoading(false);

            }

        }

        loadUser();

    }, []);

    return (

        <>

            <Typography variant="h4" gutterBottom>

                Dashboard

            </Typography>

            {loading && <CircularProgress />}

            {error && <Alert severity="error">{error}</Alert>}

            {user && (

                <Paper sx={{ p: 3, mt: 2, maxWidth: 480, borderRadius: 3 }}>

                    <Stack spacing={2}>

                        <Typography variant="h6">
                            {user.name}
                        </Typography>

                        <Typography color="text.secondary">
                            {user.email}
                        </Typography>

                        <Typography color="text.secondary">
                            {user.phone}
                        </Typography>

                        <Chip
                            label={user.role}
                            color="primary"
                            sx={{ width: "fit-content", textTransform: "capitalize" }}
                        />

                    </Stack>

                </Paper>

            )}

        </>

    );

}

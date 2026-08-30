import { useEffect, useState } from "react";

import {
    Typography,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Alert,
    CircularProgress,
} from "@mui/material";

import { getRideHistory } from "../services/ride";

export default function RideHistory() {

    const [rides, setRides] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadHistory() {

            try {

                const data = await getRideHistory();

                setRides(data);

            } catch {

                setError("Could not load ride history.");

            } finally {

                setLoading(false);

            }

        }

        loadHistory();

    }, []);

    return (

        <>

            <Typography variant="h4" gutterBottom>

                Ride History

            </Typography>

            {loading && <CircularProgress />}

            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && rides.length === 0 && (

                <Typography color="text.secondary">
                    You haven't taken any rides yet.
                </Typography>

            )}

            {rides.length > 0 && (

                <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>

                    <Table>

                        <TableHead>

                            <TableRow>
                                <TableCell>Ride</TableCell>
                                <TableCell>Distance (km)</TableCell>
                                <TableCell>Fare</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Requested At</TableCell>
                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {rides.map((ride) => (

                                <TableRow key={ride.id}>

                                    <TableCell>#{ride.id}</TableCell>

                                    <TableCell>
                                        {ride.distance_km?.toFixed(2)}
                                    </TableCell>

                                    <TableCell>৳{ride.fare}</TableCell>

                                    <TableCell>

                                        <Chip
                                            size="small"
                                            label={ride.status}
                                            color={
                                                ride.status === "COMPLETED"
                                                    ? "success"
                                                    : ride.status === "REQUESTED"
                                                    ? "warning"
                                                    : "info"
                                            }
                                        />

                                    </TableCell>

                                    <TableCell>
                                        {new Date(ride.requested_at).toLocaleString()}
                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </Paper>

            )}

        </>

    );

}

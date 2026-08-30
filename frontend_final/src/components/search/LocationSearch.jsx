import { useRef, useState } from "react";

import {
    TextField,
    Paper,
    List,
    ListItemButton,
    ListItemText,
    CircularProgress,
} from "@mui/material";

import { searchLocation } from "../../services/geocoding";

export default function LocationSearch({
    label,
    value,
    onSelect,
}) {

    const [query, setQuery] = useState(value?.name || "");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [prevValue, setPrevValue] = useState(value);

    const debounceRef = useRef(null);

    // Keep the text field in sync when pickup/destination changes
    // from outside this component (e.g. a map click, or the clear button).
    if (value !== prevValue) {

        setPrevValue(value);
        setQuery(value?.name || "");

    }

    function handleChange(e) {

        const text = e.target.value;

        setQuery(text);
        setOpen(true);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (text.trim().length < 3) {
            setResults([]);
            return;
        }

        debounceRef.current = setTimeout(async () => {

            setLoading(true);

            try {

                const places = await searchLocation(text);

                setResults(places);

            } catch {

                setResults([]);

            } finally {

                setLoading(false);

            }

        }, 400);

    }

    function handleSelect(place) {

        setQuery(place.display_name);
        setResults([]);
        setOpen(false);

        onSelect({
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon),
            name: place.display_name,
        });

    }

    return (

        <div style={{ position: "relative" }}>

            <TextField

                label={label}

                fullWidth

                size="small"

                value={query}

                onChange={handleChange}

                onFocus={() => setOpen(true)}

                onBlur={() => setTimeout(() => setOpen(false), 150)}

                slotProps={{
                    input: {
                        endAdornment: loading ? <CircularProgress size={16} /> : null,
                    },
                }}

            />

            {open && results.length > 0 && (

                <Paper

                    sx={{

                        position: "absolute",

                        top: "100%",

                        left: 0,

                        right: 0,

                        zIndex: 1400,

                        maxHeight: 220,

                        overflowY: "auto",

                        mt: 0.5,

                    }}

                >

                    <List dense disablePadding>

                        {results.map((place) => (

                            <ListItemButton

                                key={place.place_id}

                                onMouseDown={() => handleSelect(place)}

                            >

                                <ListItemText

                                    primary={place.display_name}

                                    slotProps={{
                                        primary: {
                                            sx: {
                                                fontSize: 13,
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            },
                                        },
                                    }}

                                />

                            </ListItemButton>

                        ))}

                    </List>

                </Paper>

            )}

        </div>

    );

}

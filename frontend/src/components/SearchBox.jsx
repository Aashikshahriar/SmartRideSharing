import { useState } from "react";
import { searchLocation } from "../services/geocoding";

export default function SearchBox({
    placeholder,
    onSelect,
}) {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    async function handleChange(e) {

        const value = e.target.value;

        setQuery(value);

        if (value.length < 3) {
            setResults([]);
            return;
        }

        const locations = await searchLocation(value);

        setResults(locations);
    }

    return (
        <div style={{ marginBottom: 15 }}>

            <input
                placeholder={placeholder}
                value={query}
                onChange={handleChange}
                style={{
                    width: "100%",
                    padding: 12,
                }}
            />

            <div
                style={{
                    background: "white",
                    border: "1px solid #ddd",
                }}
            >

                {results.map(place => (

                    <div
                        key={place.place_id}
                        onClick={() => {

                            setQuery(place.display_name);

                            setResults([]);

                            onSelect({
                                lat: parseFloat(place.lat),
                                lon: parseFloat(place.lon),
                                name: place.display_name
                            });

                        }}
                        style={{
                            padding: 10,
                            cursor: "pointer",
                        }}
                    >
                        {place.display_name}
                    </div>

                ))}

            </div>

        </div>
    );
}
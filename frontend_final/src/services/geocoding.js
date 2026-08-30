export async function searchLocation(query) {

    if (!query) return [];

    const url =
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
        headers: {
            "Accept": "application/json",
        },
    });

    const data = await response.json();

    return data;

}
export async function searchLocation(query) {
    if (!query) return [];

    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
    );

    return await response.json();
}
import polyline from "@mapbox/polyline";

export async function getRoute(start, end) {

    const url =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${start.lon},${start.lat};${end.lon},${end.lat}` +
        `?overview=full&geometries=polyline`;

    const response = await fetch(url);

    const data = await response.json();

    if (!data.routes.length) return null;

    const route = data.routes[0];

    return {
        distance: route.distance,
        duration: route.duration,
        coordinates: polyline.decode(route.geometry)
    };
}
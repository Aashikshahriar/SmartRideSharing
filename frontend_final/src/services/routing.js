export async function getRoute(

    start,

    end,

) {

    const url =

`https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;

    const response = await fetch(url);

    const data = await response.json();

    if (

        !data.routes ||

        data.routes.length === 0

    ) {

        return null;

    }

    return {

        distance:

            data.routes[0].distance,

        duration:

            data.routes[0].duration,

        coordinates:

            data.routes[0].geometry.coordinates.map(

                ([lng, lat]) => [lat, lng]

            ),

    };

}
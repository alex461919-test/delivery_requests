import L, { point } from 'leaflet';
import { useEffect, useMemo } from 'react';
import { useMap } from 'react-leaflet';
import RoutingMachine from './RoutineMachine';
import { useVisibleRoutes } from './store';

const Routes: React.FC = props => {
    const routesWaypoints = useVisibleRoutes();
    const map = useMap();

    console.log('render Routes');

    const defaultBounds = useMemo(() => map?.getBounds(), [map]);

    useEffect(() => {
        if (routesWaypoints.length > 0) {
            const points: Array<L.LatLng> = [];
            routesWaypoints.forEach(item => {
                if (item?.length === 2) {
                    points.push(L.latLng(item[0][0], item[0][1]));
                    points.push(L.latLng(item[1][0], item[1][1]));
                }
            });
            points.length > 1 && map?.fitBounds(L.latLngBounds(points), { padding: point(50, 50) });
        } else {
            defaultBounds && map?.fitBounds(defaultBounds, { padding: point(0, 0) });
        }
    }, [defaultBounds, map, routesWaypoints]);
    return (
        <>
            {routesWaypoints.map(points =>
                points ? (
                    <RoutingMachine
                        key={points.toString()}
                        waypoints={[L.latLng(points[0][0], points[0][1]), L.latLng(points[1][0], points[1][1])]}
                    />
                ) : null,
            )}
        </>
    );
};
export default Routes;

import React, { useCallback } from 'react';
import { MapContainer, MapContainerProps, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import RouteGroup from './RouteGroup';

L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.7.1/dist/images/';

const Map = React.forwardRef<L.Map, MapContainerProps>((props, ref) => {
    console.log('render Map');

    const onMapCreated = useCallback(
        (map: L.Map) => {
            if (typeof ref === 'function') ref(map);
            if (ref && typeof ref === 'object') ref.current = map;
        },
        [ref],
    );

    return (
        <MapContainer {...props} whenCreated={onMapCreated}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <RouteGroup />
        </MapContainer>
    );
});

export default React.memo(Map);

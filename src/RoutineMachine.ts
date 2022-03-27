import L, { ControlOptions } from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import React from 'react';
import randomcolord from 'randomcolor';

const createRoutineMachineLayer = (props: ControlOptions & L.Routing.RoutingControlOptions) => {
    const instance = L.Routing.control({
        //    waypoints: [L.latLng(55.737244071523445, 37.58541298008997), L.latLng(55.537244071523445, 37.6541298008997)],
        lineOptions: {
            styles: [{ color: randomcolord({ luminosity: 'dark' }), weight: 4 }],
            extendToWaypoints: false,
            missingRouteTolerance: 0,
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: false,
        fitSelectedRoutes: false,
        showAlternatives: false,
        ...props,
    });

    return instance;
};

const RoutingMachine: React.ForwardRefExoticComponent<
    L.ControlOptions & React.RefAttributes<L.Routing.Control> & L.Routing.RoutingControlOptions
> = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;

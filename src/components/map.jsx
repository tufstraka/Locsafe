import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import { Location } from "../hooks/location.jsx";
import L from "leaflet";
import 'leaflet-routing-machine';

const Map = () => {
  const { position } = Location();
  const mapRef = useRef(null);
  const routeRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(-1.241034, 36.890439), // Start point coordinates
          L.latLng(-1.234495, 36.882605), // End point coordinates
        ],
        routeWhileDragging: true,
      });

      routeRef.current = routingControl.getPlan().getRoute();
      routingControl.addTo(map);
    }
  }, []);

  function MoveToLocation() {
    const map = useMap();
    map.flyTo(position, 18);
    return null;
  }

  function handleMapClick(event) {
    const { lat, lng } = event.latlng;
    console.log('Clicked coordinates:', lat, lng);
  }


    const svgString = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 40 40" width="40px" height="40px"><path fill="#8bb7f0" d="M4,28.5c-1.93,0-3.5-1.57-3.5-3.5v-5.245c0-0.999,0.677-1.864,1.646-2.104l4.184-1.228l2.1-3.548 c0.866-1.466,2.46-2.376,4.162-2.376h9.4c1.28,0,2.532,0.521,3.434,1.431l4.303,4.51l8.187,2.488 c0.937,0.266,1.584,1.122,1.584,2.086v5.318c0,1.195-0.972,2.167-2.167,2.167H4z"/><path fill="#4e7ab5" d="M21.992,11c1.148,0,2.27,0.468,3.065,1.27l4.219,4.42l0.181,0.19l0.251,0.076l8.079,2.455 C38.502,19.614,39,20.273,39,21.015v5.318C39,27.252,38.252,28,37.333,28H4c-1.654,0-3-1.346-3-3v-5.245 c0-0.768,0.521-1.434,1.309-1.629l3.973-1.166l0.378-0.111l0.201-0.339l2.001-3.38C9.637,11.816,11.067,11,12.592,11H21.992 M21.992,10h-9.4C10.706,10,8.959,10.997,8,12.621L6,16l-3.973,1.166C0.836,17.46,0,18.528,0,19.755V25c0,2.209,1.791,4,4,4 h33.333C38.806,29,40,27.806,40,26.333v-5.318c0-1.192-0.791-2.24-1.938-2.565L30,16l-4.219-4.421 C24.779,10.569,23.415,10,21.992,10L21.992,10z"/><path fill="#c8d1db" d="M31.5 23.5A4 4 0 1 0 31.5 31.5A4 4 0 1 0 31.5 23.5Z"/><path fill="#66798f" d="M31.5,24c1.93,0,3.5,1.57,3.5,3.5S33.43,31,31.5,31S28,29.43,28,27.5S29.57,24,31.5,24 M31.5,23 c-2.485,0-4.5,2.015-4.5,4.5s2.015,4.5,4.5,4.5s4.5-2.015,4.5-4.5S33.985,23,31.5,23L31.5,23z"/><path fill="#66798f" d="M31.5 26A1.5 1.5 0 1 0 31.5 29A1.5 1.5 0 1 0 31.5 26Z"/><path fill="#c8d1db" d="M8.5 23.5A4 4 0 1 0 8.5 31.5A4 4 0 1 0 8.5 23.5Z"/><path fill="#66798f" d="M8.5,24c1.93,0,3.5,1.57,3.5,3.5S10.43,31,8.5,31S5,29.43,5,27.5S6.57,24,8.5,24 M8.5,23 C6.015,23,4,25.015,4,27.5S6.015,32,8.5,32s4.5-2.015,4.5-4.5S10.985,23,8.5,23L8.5,23z"/><path fill="#66798f" d="M8.5 26A1.5 1.5 0 1 0 8.5 29A1.5 1.5 0 1 0 8.5 26Z"/><path fill="#c2e8ff" d="M5.89,16.5l2.52-3.592c0.887-1.498,2.481-2.408,4.183-2.408h9.4c1.281,0,2.532,0.521,3.433,1.431 l4.638,4.569H5.89z"/><path fill="#4e7ab5" d="M21.992,11c1.148,0,2.27,0.468,3.087,1.292L28.843,16H6.851l1.967-2.804l0.023-0.032l0.02-0.034 C9.637,11.816,11.067,11,12.592,11H21.992 M21.992,10h-9.4C10.706,10,8.959,10.997,8,12.621l-2.604,3.712L3,17h30l-2.394-0.667 l-4.826-4.754C24.779,10.569,23.415,10,21.992,10L21.992,10z"/><path fill="none" stroke="#4e7ab5" stroke-miterlimit="10" d="M16.5 17L16.5 10.333"/><path fill="#c74343" d="M2.5,23H0v-3h2.5C3.328,20,4,20.672,4,21.5v0C4,22.328,3.328,23,2.5,23z"/><path fill="#fff" d="M38.5,21c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5H39v-2.501c0-0.173-0.037-0.337-0.079-0.499 H38.5z"/></svg>`
  const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);

const svgIcon = L.icon({
  iconUrl: svgUrl,
  iconSize: [40, 40],
});

  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{
          minWidth: "300px",
          minHeight: "500px",
          width: "100%",
          padding: "15px",
        }}
        ref={mapRef}
        onClick={handleMapClick}
      >
        <MoveToLocation/>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {routeRef.current && (
          <Polyline
            positions={routeRef.current.coordinates}
            color="blue"
            weight={6}
          />
        )}
        <Marker position={position} icon={svgIcon}>
          <Popup>Car Type: Nissan</Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default Map;



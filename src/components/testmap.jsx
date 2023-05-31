import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

const MapComponent = () => {
  const mapRef = useRef(null);
  const polylineRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;

      const startCoords = L.latLng(-1.241034, 36.890439);
      const endCoords = L.latLng(-1.234495, 36.882605);

      const routingControl = L.Routing.control({
        waypoints: [startCoords, endCoords],
        routeWhileDragging: true,
      }).addTo(map);

      // Get the route line and update the polyline component
      routingControl.on('routesfound', function (e) {
        const routes = e.routes;
        const line = routes[0].lines[0];

        if (polylineRef.current) {
          polylineRef.current.setLatLngs(line.getLatLngs());
        }
      });
    }
  }, []);

  function handleMapClick(event) {
    const { lat, lng } = event.latlng;
    console.log('Clicked coordinates:', lat, lng);
  }

  function MoveToLocation() {
    const map = useMap();
    map.flyTo([-1.2373, 36.8904], 13);
    return null;
  }

  function calculateRoute() {
    if (!mapRef.current || !polylineRef.current) return;

    const start = L.latLng(-1.241034, 36.890439);
    const end = L.latLng(-1.234495, 36.882605);

    if (!start || !end) {
      setError('Please provide valid start and end positions.');
      return;
    }

    setError(null);

    const routingControl = L.Routing.control({
      waypoints: [start, end],
      routeWhileDragging: true,
    }).addTo(mapRef.current.leafletElement);

    routingControl.on('routesfound', function (e) {
      const routes = e.routes;
      const line = routes[0].lines[0];

      if (polylineRef.current) {
        polylineRef.current.setLatLngs(line.getLatLngs());
      }
    });
  }

  return (
    <>
    <MapContainer
      center={[-1.2373, 36.8904]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
      ref={mapRef}
      onClick={handleMapClick} // Handle map click event
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MoveToLocation />
      <Marker position={[-1.241034, 36.890439]}>
        <Popup>Start Point</Popup>
      </Marker>
      <Marker position={[-1.234495, 36.882605]}>
        <Popup>End Point</Popup>
      </Marker>
      {error && <p className="error">{error}</p>}

      <Polyline ref={polylineRef} positions={[]} color="blue" />
    </MapContainer>
    {error && <p className="error">{error}</p>}
      <button className="calculate-button" onClick={calculateRoute}>
        Calculate Route
      </button>
    </>

  );
};

export default MapComponent;

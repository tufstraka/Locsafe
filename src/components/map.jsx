import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../utils/firebaseInit.js";
import { Location } from "../hooks/location.jsx";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Marker icon fix for production
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {
  const [locations, setLocations] = useState([]);
  const { position } = Location();

  useEffect(() => {
    const fetchLocations = async () => {
      const locationsSnapshot = await getDocs(collection(db, "locations"));
      const locationData = locationsSnapshot.docs.map((doc) => {
        const recentLocation = doc.data().recentLocations.pop();
        return recentLocation ? recentLocation.location : null;
      }).filter(location => location); // Filter out null locations

      setLocations(locationData);
    };

    fetchLocations();
  }, []);

  const MoveToLocation = () => {
    const map = useMap();
    if (position) {
      map.flyTo(position, 18);
    }
    return null;
  };

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40px" height="40px">
    <!-- SVG content here -->
  </svg>`;
  const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);

  const svgIcon = L.icon({
    iconUrl: svgUrl,
    iconSize: [40, 40],
  });

  return (
    <div className="relative z-0">
      <MapContainer
        center={position}
        zoom={18}
        scrollWheelZoom={true}
        style={{
          minWidth: "300px",
          width: "100%",
          height: "500px",
          padding: "15px",
        }}
      >
        <MoveToLocation />

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={svgIcon}
          >
            <Popup>Car Type: Nissan</Popup>
          </Marker>
        ))}

        <Marker position={position} />
      </MapContainer>
    </div>
  );
};

export default Map;


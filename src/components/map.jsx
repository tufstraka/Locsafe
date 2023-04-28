import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Location } from "../hooks/location.jsx";


const Map = () => {
  const { position } = Location();

  function MoveToLocation() {
    const map = useMap();
    map.flyTo(position, 13);
    return null;
  }
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
        <MoveToLocation/>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
          
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;


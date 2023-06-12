import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';


const GeofenceMap = () => {
    const [geofenceLayers, setGeofenceLayers] = useState([]);
  
    // Custom event handler for geofence creation
    const onCreated = (e) => {
      const { layer } = e;
      setGeofenceLayers((prevLayers) => [...prevLayers, layer]);
    };
  
    // Custom event handler for geofence deletion
    const onDeleted = () => {
      setGeofenceLayers([]);
    };
  
    // Custom event handler for geofence editing
    const onEdited = (e) => {
      const { layers } = e;
      setGeofenceLayers(Object.values(layers));
    };
  
    // Hook to handle geofence draw events
    const EventHandling = () => {
      useMapEvents({
        draw: {
          created: onCreated,
          deleted: onDeleted,
          edited: onEdited,
        },
      });
  
      return null;
    };
  
    return (
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  
        <EventHandling />
  
        <EditControl
          position="topright"
          draw={{
            rectangle: false,
            polygon: {
              allowIntersection: false,
              showArea: true,
            },
            circlemarker: false,
            circle: false,
            polyline: false,
            marker: false,
          }}
        />
  
        {geofenceLayers.map((layer, index) => (
          <React.Fragment key={index}>
            {layer}
          </React.Fragment>
        ))}
      </MapContainer>
    );
  };

  
  export default GeofenceMap;


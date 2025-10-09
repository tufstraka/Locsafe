import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import { motion } from 'framer-motion';

// Fix for default markers in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const GeofenceMap = ({ 
  onShapeCreated, 
  existingGeofences = [], 
  selectedZone = null,
  isDrawing = false,
  drawingType = 'polygon' 
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const drawnItemsRef = useRef(null);
  const drawControlRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([-1.2864, 36.8172], 11); // Nairobi coordinates
    mapInstanceRef.current = map;

    // Add tile layer with dark mode support
    const isDarkMode = document.documentElement.classList.contains('dark');
    const tileUrl = isDarkMode 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    
    L.tileLayer(tileUrl, {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Initialize the FeatureGroup to store editable layers
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    drawnItemsRef.current = drawnItems;

    // Initialize the draw control
    const drawControl = new L.Control.Draw({
      position: 'topleft',
      draw: {
        polygon: {
          allowIntersection: false,
          drawError: {
            color: '#e1e100',
            message: '<strong>Error:</strong> Shape edges cannot cross!'
          },
          shapeOptions: {
            color: '#6366f1',
            weight: 3,
            opacity: 0.8,
            fillOpacity: 0.2
          }
        },
        circle: {
          shapeOptions: {
            color: '#10b981',
            weight: 3,
            opacity: 0.8,
            fillOpacity: 0.2
          }
        },
        polyline: {
          shapeOptions: {
            color: '#f59e0b',
            weight: 4,
            opacity: 0.8
          }
        },
        rectangle: {
          shapeOptions: {
            color: '#8b5cf6',
            weight: 3,
            opacity: 0.8,
            fillOpacity: 0.2
          }
        },
        marker: true,
        circlemarker: false
      },
      edit: {
        featureGroup: drawnItems,
        remove: true
      }
    });
    
    map.addControl(drawControl);
    drawControlRef.current = drawControl;

    // Handle created shapes
    map.on(L.Draw.Event.CREATED, (e) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);
      
      // Get shape data
      let shapeData = {
        type: e.layerType,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };

      if (e.layerType === 'circle') {
        shapeData.center = layer.getLatLng();
        shapeData.radius = layer.getRadius();
      } else if (e.layerType === 'polygon' || e.layerType === 'rectangle') {
        shapeData.coordinates = layer.getLatLngs()[0];
        shapeData.area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
      } else if (e.layerType === 'polyline') {
        shapeData.coordinates = layer.getLatLngs();
        shapeData.distance = calculatePolylineDistance(layer.getLatLngs());
      } else if (e.layerType === 'marker') {
        shapeData.position = layer.getLatLng();
      }

      if (onShapeCreated) {
        onShapeCreated(shapeData);
      }
    });

    // Handle edited shapes
    map.on(L.Draw.Event.EDITED, (e) => {
      const layers = e.layers;
      layers.eachLayer((layer) => {
        console.log('Shape edited:', layer);
      });
    });

    // Handle deleted shapes
    map.on(L.Draw.Event.DELETED, (e) => {
      const layers = e.layers;
      layers.eachLayer((layer) => {
        console.log('Shape deleted:', layer);
      });
    });

    setMapReady(true);

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Add existing geofences to map
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !drawnItemsRef.current) return;

    // Clear existing layers first
    drawnItemsRef.current.clearLayers();

    existingGeofences.forEach((geofence) => {
      let layer;
      
      if (geofence.type === 'circular' && geofence.center) {
        layer = L.circle([geofence.center.lat, geofence.center.lng], {
          radius: parseInt(geofence.radius) * 1000, // Convert km to meters
          color: geofence.color || '#6366f1',
          fillOpacity: 0.2,
          weight: 2
        });
      } else if (geofence.type === 'polygon' && geofence.coordinates) {
        layer = L.polygon(geofence.coordinates, {
          color: geofence.color || '#6366f1',
          fillOpacity: 0.2,
          weight: 2
        });
      } else if (geofence.type === 'route' && geofence.coordinates) {
        layer = L.polyline(geofence.coordinates, {
          color: geofence.color || '#f59e0b',
          weight: 4,
          opacity: 0.8
        });
      }

      if (layer) {
        layer.bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold;">${geofence.name}</h3>
            <p style="margin: 4px 0;">Status: <span style="color: ${geofence.status === 'active' ? '#10b981' : '#6b7280'};">${geofence.status}</span></p>
            <p style="margin: 4px 0;">Vehicles: ${geofence.vehicles}</p>
            <p style="margin: 4px 0;">Alerts: ${geofence.alerts}</p>
          </div>
        `);
        drawnItemsRef.current.addLayer(layer);
      }
    });
  }, [existingGeofences, mapReady]);

  // Focus on selected zone
  useEffect(() => {
    if (!selectedZone || !mapInstanceRef.current || !mapReady) return;

    if (selectedZone.center) {
      mapInstanceRef.current.setView([selectedZone.center.lat, selectedZone.center.lng], 13);
    } else if (selectedZone.coordinates && selectedZone.coordinates.length > 0) {
      const bounds = L.latLngBounds(selectedZone.coordinates);
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [selectedZone, mapReady]);

  // Toggle drawing mode
  useEffect(() => {
    if (!mapInstanceRef.current || !drawControlRef.current || !mapReady) return;

    if (isDrawing) {
      // Enable only the selected drawing tool
      const drawOptions = {
        polygon: false,
        circle: false,
        polyline: false,
        rectangle: false,
        marker: false,
        circlemarker: false
      };

      if (drawingType === 'circular') {
        drawOptions.circle = {
          shapeOptions: {
            color: '#10b981',
            weight: 3,
            opacity: 0.8,
            fillOpacity: 0.2
          }
        };
      } else if (drawingType === 'polygon') {
        drawOptions.polygon = {
          allowIntersection: false,
          shapeOptions: {
            color: '#6366f1',
            weight: 3,
            opacity: 0.8,
            fillOpacity: 0.2
          }
        };
      } else if (drawingType === 'route') {
        drawOptions.polyline = {
          shapeOptions: {
            color: '#f59e0b',
            weight: 4,
            opacity: 0.8
          }
        };
      }

      // Update draw control options
      mapInstanceRef.current.removeControl(drawControlRef.current);
      const newDrawControl = new L.Control.Draw({
        position: 'topleft',
        draw: drawOptions,
        edit: {
          featureGroup: drawnItemsRef.current,
          remove: true
        }
      });
      mapInstanceRef.current.addControl(newDrawControl);
      drawControlRef.current = newDrawControl;

      // Automatically start drawing
      if (drawingType === 'circular') {
        new L.Draw.Circle(mapInstanceRef.current).enable();
      } else if (drawingType === 'polygon') {
        new L.Draw.Polygon(mapInstanceRef.current).enable();
      } else if (drawingType === 'route') {
        new L.Draw.Polyline(mapInstanceRef.current).enable();
      }
    }
  }, [isDrawing, drawingType, mapReady]);

  // Helper function to calculate polyline distance
  const calculatePolylineDistance = (latlngs) => {
    let distance = 0;
    for (let i = 0; i < latlngs.length - 1; i++) {
      distance += latlngs[i].distanceTo(latlngs[i + 1]);
    }
    return distance;
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Loading Indicator */}
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Drawing Mode Indicator */}
      {isDrawing && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-2 rounded-lg shadow-lg z-[1000]"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-white rounded-full"
            />
            <span className="text-sm font-medium">
              Drawing Mode: Click on map to start drawing {drawingType}
            </span>
          </div>
        </motion.div>
      )}

      {/* Map Controls Legend */}
      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-3 z-[999]">
        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Map Controls</h4>
        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full opacity-50" />
            <span>Polygon Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full opacity-50" />
            <span>Circular Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded" />
            <span>Route Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
};

GeofenceMap.propTypes = {
  onShapeCreated: PropTypes.func,
  existingGeofences: PropTypes.array,
  selectedZone: PropTypes.object,
  isDrawing: PropTypes.bool,
  drawingType: PropTypes.string
};

export default GeofenceMap;
'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './CampusNavigation.css';

// Fix default marker icons for React
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Helper component to get and display user location
function UserLocationMarker({ setUserLocation }) {
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: false, enableHighAccuracy: true });
    map.on('locationfound', (e) => {
      setUserLocation(e.latlng);
    });
  }, [map, setUserLocation]);

  return null;
}

// Helper component to refresh map size (prevents tile rendering issues)
// In your CampusNavigation.js (or new file)
function MapRefresher({ isFull }) {
  const map = useMap();

  // This useEffect runs once on mount AND every time 'isFull' changes
  useEffect(() => {
    // A short delay is often necessary for CSS transitions to complete
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100); 

    return () => clearTimeout(timer); // Cleanup function
  }, [map, isFull]); 

  return null;
}


export default function CampusNavigation({ coordinates = [10.728284, 79.020296] }) {
  const [isFull, setIsFull] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Default location and bounds (restrict panning)
  const defaultCenter = [10.728284, 79.020296];
  const bounds = [
    [10.72, 79.01], // Southwest corner
    [10.74, 79.03], // Northeast corner
  ];

  return (
    <div className={`map-container ${isFull ? 'fullscreen' : ''}`}>
      <MapContainer
        center={defaultCenter}
        zoom={17}
        scrollWheelZoom={true}
        zoomControl={true}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

       
  {/* ... other components ... */}
  <MapRefresher isFull={isFull} />

        <UserLocationMarker setUserLocation={setUserLocation} />

        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation} icon={customIcon}>
            <Popup>📍 You are here</Popup>
          </Marker>
        )}

        {/* Marker for the given coordinates */}
        <Marker position={coordinates} icon={customIcon}>
          <Popup>
            📍 Destination <br />
            ({coordinates[0].toFixed(5)}, {coordinates[1].toFixed(5)})
          </Popup>
        </Marker>
      </MapContainer>

      {/* Fullscreen / Close button */}
      <button onClick={() => setIsFull(!isFull)} className="map-btn">
        {isFull ? '✖ Close' : '⛶ Fullscreen'}
      </button>
    </div>
  );
}

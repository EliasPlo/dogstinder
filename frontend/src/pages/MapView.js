import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "axios";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapView = ({ type }) => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/markers/${type}`).then((res) => {
            setMarkers(res.data);
        });
    }, [type]);

const MapClickHandler = ({ type, setMarkers }) => {
    useMapEvents({
        click: (e) => {
            const newMarker = {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
                name: prompt("Anna merkinnän nimi:")
            };

            axios.post(`http://localhost:5000/api/markers/${type}`, newMarker).then(() => {
                setMarkers((prev) => [...prev, newMarker]);
            });
        }
    });
    return null;
};

    return (
        <MapContainer center={[60.1699, 24.9384]} zoom={12} style={{ height: "100vh", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {markers.map((marker, index) => (
                <Marker key={index} position={[marker.lat, marker.lng]}>
                    <Popup>{marker.name}</Popup>
                </Marker>
            ))}
            <MapClickHandler type={type} setMarkers={setMarkers} />
        </MapContainer>
    );
};

export default MapView;

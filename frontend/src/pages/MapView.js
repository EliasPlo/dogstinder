import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Container, Button, Typography } from "@mui/material";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "axios";
import { Link } from "react-router-dom";

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

    return (
        <Container sx={{ textAlign: "left", mt: 3 }}>
            <Button variant="contained" component={Link} to="/maps" sx={{ mb: 1 }}>
                Takaisin
            </Button>
        <MapContainer center={[60.1699, 24.9384]} zoom={12} style={{ height: "1000px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {markers.map((marker, index) => (
                <Marker key={index} position={[marker.lat, marker.lng]}>
                        <Popup>
                            <Typography variant="h6">{marker.name}</Typography>
                            <Typography variant="body2">{marker.description}</Typography>
                            <Typography variant="caption" color="textSecondary">{marker.date}</Typography>
                        </Popup>
                </Marker>
            ))}
        </MapContainer>
        </Container>
    );
};

export default MapView;

import { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [type, setType] = useState("puistot");
    const [name, setName] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [markers, setMarkers] = useState([]);

    // Hakee merkinnät backendistä
    useEffect(() => {
        axios.get(`http://localhost:5000/api/markers/${type}`)
            .then((res) => setMarkers(res.data))
            .catch((err) => console.error("Virhe merkintöjen haussa", err));
    }, [type]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMarker = { name, lat: parseFloat(lat), lng: parseFloat(lng) };

        try {
            await axios.post("http://localhost:5000/api/admin/addMarker", { type, newMarker });
            alert("Merkintä lisätty!");
            setName("");
            setLat("");
            setLng("");
            // Päivittää listan uusilla merkinnöillä
            setMarkers([...markers, newMarker]);
        } catch (error) {
            console.error("Virhe lisättäessä merkintää", error);
        }
    };

    const handleDelete = async (markerId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/deleteMarker/${type}/${markerId}`);
            alert("Merkintä poistettu!");
            setMarkers(markers.filter((marker) => marker.id !== markerId));
        } catch (error) {
            console.error("Virhe poistettaessa merkintää", error);
        }
    };

    return (
        <div>
            <h2>Admin: Lisää merkintä</h2>
            <form onSubmit={handleSubmit}>
                <label>Kartan tyyppi:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="puistot">Puistot</option>
                    <option value="elaainlaakarit">Eläinlääkärit</option>
                    <option value="tapahtumat">Tapahtumat</option>
                </select>

                <label>Nimi:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Leveysaste (lat):</label>
                <input type="number" step="0.0001" value={lat} onChange={(e) => setLat(e.target.value)} required />

                <label>Pituusaste (lng):</label>
                <input type="number" step="0.0001" value={lng} onChange={(e) => setLng(e.target.value)} required />

                <button type="submit">Lisää merkintä</button>
            </form>

            <h3>Kaikki merkinnät ({type})</h3>
            <ul>
                {markers.map((marker) => (
                    <li key={marker.id}>
                        {marker.name} - {marker.lat}, {marker.lng}{" "}
                        <button onClick={() => handleDelete(marker.id)}>Poista</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;

const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DATA_FOLDER = path.join(__dirname, "data");

const { v4: uuidv4 } = require("uuid");

router.post("/addMarker", (req, res) => {
    const { type, newMarker } = req.body;
    const filePath = path.join(DATA_FOLDER, `${type}.json`);
    newMarker.id = uuidv4();
    let data = [];
    if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath);
        data = JSON.parse(rawData);
    }
    data.push(newMarker);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    res.json({ success: true, message: "Merkintä lisätty onnistuneesti!" });
});

// DELETE /api/admin/deleteMarker/:type/:markerId
router.delete("/deleteMarker/:type/:markerId", (req, res) => {
    const { type, markerId } = req.params;
    const filePath = path.join(DATA_FOLDER, `${type}.json`);

    // Lue olemassa olevat tiedot
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Tiedosto ei löytynyt." });
    }

    let data = JSON.parse(fs.readFileSync(filePath));

    // Poistetaan merkintä ID:n perusteella
    const updatedData = data.filter((marker) => marker.id !== markerId);

    // Tallennetaan päivitetyt tiedot
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 4));

    res.json({ success: true, message: "Merkintä poistettu!" });
});

module.exports = router;

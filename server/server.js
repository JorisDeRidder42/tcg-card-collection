import express from "express";
import multer from "multer";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

const VITE_APP_BASE_URL = process.env.VITE_APP_BASE_URL;
const VITE_APP_API_KEY = process.env.VITE_APP_API_KEY;

// Test route voor sets
app.get("/api/sets", async (req, res) => {
  try {
    res.json({ working: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/scan', upload.single('image'), async (req, res) => {
  console.log("Uploaded file:", req.file);

  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  try {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(req.file.path));

    const response = await fetch(`${VITE_APP_BASE_URL}/search`, {
  method: 'POST',
  headers: { 'X-Api-Key': VITE_APP_API_KEY },
  body: formData
});

if (!response.ok) {
  const text = await response.text();
  console.error("External API error:", text);
  return res.status(response.status).json({ error: text });
}

const result = await response.json();

if (!result.data || result.data.length === 0) {
  return res.status(404).json({ error: "No card found" });
}

res.json({ card: result.data[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch sets' });
  }
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
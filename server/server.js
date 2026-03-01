import express from "express";
import multer from "multer";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";
import cors from "cors";

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

const API_KEY = "86b1277c-f047-477a-9d6e-cdd72694f9c7";

app.post("/api/scan", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path;

    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));

    const response = await fetch(
      "https://api.tcgdex.net/v2/en/cards/search",
      {
        method: "POST",
        headers: {
          "X-Api-Key": API_KEY,
        },
        body: formData,
      }
    );

    const result = await response.json();
    res.json({ card: result.data?.[0] || null });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scan failed" });
  }
});

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
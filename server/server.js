import express from "express";
import multer from "multer";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const VITE_APP_BASE_URL = process.env.VITE_APP_BASE_URL;
const VITE_APP_API_KEY = process.env.VITE_APP_API_KEY;

app.get('/api/sets', async (req, res) => {
  try {
    const response = await fetch(`${VITE_APP_BASE_URL}/sets`, {
      headers: { 'X-Api-Key': VITE_APP_API_KEY }
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch sets' });
  }
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
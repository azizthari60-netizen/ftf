require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Static frontend (served from /frontend)
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

// Simple health check route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Falah-e-Thar backend", time: new Date().toISOString() });
});

// Demo routes for forms (no persistence, just echo)
app.post("/api/donate", (req, res) => {
  res.status(200).json({ ok: true, received: req.body });
});

app.post("/api/volunteer", (req, res) => {
  res.status(200).json({ ok: true, received: req.body });
});

app.post("/api/contact", (req, res) => {
  res.status(200).json({ ok: true, received: req.body });
});

// Serve index.html for any unknown route (for basic hosting convenience)
app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Falah-e-Thar server running on http://localhost:${PORT}`);
});



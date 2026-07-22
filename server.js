/**
 * CropAdvise — Express Backend Server
 *
 * Routes:
 *   GET  /              → index.html (main app)
 *   GET  /chat          → chat.html  (standalone chat page)
 *   GET  /api/health    → JSON health check
 *   POST /api/advice    → Rule-based crop advisory (mirrors JS engine)
 *   GET  /api/crops     → List of supported crops
 *
 * Usage:
 *   npm install && npm start   → http://localhost:3000
 *   npm run dev                → hot-reload with nodemon
 */

const express = require('express');
const path    = require('path');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Middleware ── */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

/* ── Health ── */
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'CropAdvise API',
    version: '2.0.0',
    engine: 'CropAdvise Knowledge Engine (self-contained)',
    timestamp: new Date().toISOString(),
  });
});

/* ── Supported crops list ── */
const CROPS = [
  'wheat','rice','corn','potato','tomato','soybean',
  'cotton','sugarcane','onion','sunflower','mango',
];
app.get('/api/crops', (_req, res) => res.json({ crops: CROPS }));

/* ── Advisory endpoint (server-side mirror of the JS knowledge engine) ──
 *
 *  POST /api/advice
 *  Body: { query: string }          ← free-text, like the chat
 *   OR   { crop, issue, soil, region }  ← structured form
 *
 *  Returns: { response: string, structured: object|null }
 */
app.post('/api/advice', (req, res) => {
  const { query, crop, issue, soil, region } = req.body || {};

  // Build a natural-language query from structured fields if query not provided
  const naturalQuery = query ||
    [crop && `Tell me about ${crop}`,
     issue && `pest or disease: ${issue}`,
     soil  && `soil type: ${soil}`,
     region && `region: ${region}`]
    .filter(Boolean).join('. ')
    || 'general farming advice';

  // Structured meta-response
  const structured = crop ? {
    crop,
    issue: issue || null,
    soil:  soil  || null,
    region: region || null,
    note: 'See the response field for detailed AI advisory.',
  } : null;

  res.json({
    query: naturalQuery,
    response: `Advisory for "${naturalQuery}": Use the CropAdvise AI chat agent on the main page for a full, real-time analysis. The in-browser engine covers crop guides, pest control, soil analysis, irrigation, and fertilizer recommendations.`,
    structured,
    hint: 'The full knowledge engine runs in-browser via js/cropAgent.js — no server round-trip needed for chat.',
  });
});

/* ── Chat page ── */
app.get('/chat', (_req, res) => {
  res.sendFile(path.join(__dirname, 'chat.html'));
});

/* ── Catch-all SPA ── */
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/* ── Start ── */
app.listen(PORT, () => {
  console.log(`\n🌾  CropAdvise server running at http://localhost:${PORT}`);
  console.log(`    AI Engine: in-browser (js/cropAgent.js)`);
  console.log(`    API:       /api/health  /api/crops  /api/advice\n`);
});

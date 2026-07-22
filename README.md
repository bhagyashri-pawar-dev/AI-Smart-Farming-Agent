# CropAdvise — AI Crop Advisory Agent

A beautiful, production-ready web application with an **IBM watsonx Orchestrate** AI chat agent embedded directly into the page.

---

## 🌾 Features

| Feature | Details |
|---|---|
| **Hero Section** | Full-screen dark-green gradient with agent preview card |
| **6 Feature Cards** | Crop Selection, Soil Analysis, Irrigation, Pest Control, Weather, Yield Forecasting |
| **Crops Marquee** | Auto-scrolling banner of 15+ supported crops |
| **How It Works** | 3-step process flow |
| **AI Chat Widget** | IBM watsonx Orchestrate embedded chat agent |
| **Backend API** | Express.js with `/api/health` and `/api/advice` endpoints |
| **Fully Responsive** | Mobile-first, hamburger nav, adaptive grid layouts |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run
```bash
npm install
npm start
```
Open **http://localhost:3000** in your browser.

### Development (hot-reload)
```bash
npm run dev
```

---

## 📁 Project Structure

```
cropadvise/
├── index.html          ← Main page (SPA)
├── server.js           ← Express backend
├── package.json
├── css/
│   └── style.css       ← All styles
├── js/
│   └── app.js          ← Frontend logic
└── README.md
```

---

## 🤖 IBM watsonx Orchestrate Integration

The chat widget is embedded in `index.html` using your existing configuration:

```js
window.wxOConfiguration = {
  orchestrationID: "undefined",
  hostURL: "https://au-syd.watson-orchestrate.cloud.ibm.com",
  rootElementID: "root",
  deploymentPlatform: "ibmcloud",
  crn: "crn:v1:bluemix:public:watsonx-orchestrate:...",
  chatOptions: {
    agentId: "593ac771-7b42-4b2e-a00a-fa360476d9ac"
  }
};
```

The widget loads asynchronously from IBM Cloud and mounts to `<div id="root">`.

---

## 🔌 API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Service health check |
| `POST` | `/api/advice` | Mock crop advisory (stub for backend LLM) |

### POST /api/advice — Example
```json
// Request
{ "crop": "wheat", "region": "Punjab", "issue": "yellow rust" }

// Response
{ "crop": "wheat", "region": "Punjab", "advice": "..." }
```

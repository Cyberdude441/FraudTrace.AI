# FraudTrace AI — Setup & Quickstart Guide

## Prerequisites

- **Node.js**: v18 or higher (Tested on Node v22)
- **npm**: v9 or higher
- **MongoDB**: (Optional) MongoDB v6+ if using local or remote database; if MongoDB is not running, FraudTrace AI automatically switches to the in-memory persistence store with zero configuration!

---

## 1. Installation

### Backend Server Setup:
```bash
cd server
npm install
```

### Frontend Client Setup:
```bash
cd ../client
npm install
```

---

## 2. Environment Variables

### Server (`server/.env`):
```ini
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/fraudtrace

# Optional LLM integration
# GEMINI_API_KEY=your_key_here
# OPENAI_API_KEY=your_key_here
```

---

## 3. Running the Application

### Option A: Running with Concurrent Terminals

**Terminal 1 (Backend Server):**
```bash
cd server
npm start
# or for watch mode:
npm run dev
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```

Once started:
- Frontend is accessible at: `http://localhost:5173`
- Backend API is accessible at: `http://localhost:5000/api`

---

## 4. One-Click Demo Mode

1. Navigate to `http://localhost:5173/login`.
2. Click **"Launch Demo Mode (Instant Evaluation)"**.
3. You will immediately be routed to the command center with the pre-loaded synthetic case `CASE-2026-001` (42 evidence artifacts, 27 entities, 31 timeline events, 63 relationships, 5 inconsistencies, 7 missing info gaps).
4. Zero database setup or external API keys required!

# 🖊️ Collaborative Whiteboard

A real-time collaborative whiteboard built with **React**, **Excalidraw**, **Node.js**, **Socket.io**, and **MongoDB**.

---

## ⚠️ Known Issue — Excalidraw Freedraw (Pencil) Tool

> **This is the most important thing to know before running this project.**

### The Problem

When integrating real-time collaboration using Socket.io, the **pencil/freedraw tool in Excalidraw stops working** — strokes collapse to a single dot on mouse release.

### Root Cause

Any socket emission inside Excalidraw's `onChange` or `onPointerUpdate` callbacks **interrupts Excalidraw's internal pointer event loop**, causing the freedraw stroke to be committed with only 1–2 points instead of the full stroke.

This was confirmed by:
- Bare `<Excalidraw />` with no props → pencil works ✅
- Adding `onChange` with socket emit → pencil breaks ❌
- Adding `onPointerUpdate` with socket emit → pencil breaks ❌
- Deferring emit with `setTimeout(() => emit(), 0)` inside `onPointerUpdate` → works ✅
- Deferring emit with `setTimeout(() => emit(), 0)` inside `onChange` → still breaks ❌

### Current Workaround

Socket emissions inside `onPointerUpdate` are deferred using `setTimeout(..., 0)` to move them outside Excalidraw's event loop. However, emitting inside `onChange` still breaks the pencil tool regardless of deferral.

As a result, **real-time collaboration is partially functional** — shapes, rectangles, text, and arrows sync correctly, but the freedraw/pencil strokes may not sync reliably.

### Attempted Fixes

- Downgrading Excalidraw from `0.18.0` → `0.17.6` (peer dep conflict with React 19)
- Downgrading React from `19` → `18.2.0` (did not fix the issue)
- Removing `React.StrictMode` (did not fix)
- Using `getSceneElementsIncludingDeleted()` instead of `onChange` elements (did not fix)
- Using `isCollaborating={true}` prop (made it worse)
- Using `initialAppState={{ penMode: false, penDetected: false }}` (did not fix)
- Using Liveblocks instead of Socket.io (works but too slow for real-time drawing)
- Using Yjs for CRDT-based sync (freedraw still breaks on emit)

### Versions

| Package | Version |
|---|---|
| `@excalidraw/excalidraw` | `0.17.6` |
| `react` | `18.2.0` |
| `vite` | `7.x` |
| `socket.io-client` | `4.x` |
| `socket.io` | `4.x` |

---

## 🚀 Features

- ✅ Create and manage whiteboards (CRUD)
- ✅ Draw shapes, text, arrows, and freehand strokes
- ✅ Save and load board state from MongoDB
- ✅ Authentication with JWT
- ✅ Dashboard with search and delete
- ⚠️ Real-time collaboration (partial — see known issue above)

---

## 🛠️ Tech Stack

**Frontend**
- React 18
- Excalidraw
- Vite
- Tailwind CSS
- Socket.io-client
- Axios

**Backend**
- Node.js + Express
- Socket.io
- MongoDB + Mongoose
- JWT Authentication

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB

### Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:3000
```

```bash
npm run dev
```

---

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Auth.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Board.jsx        # Main whiteboard (see known issue)
│   │   ├── context/
│   │   │   ├── UserContext.jsx
│   │   │   └── DocContext.jsx
│   │   └── components/
│   │       ├── MainDashboard.jsx
│   │       └── CreateDoc.jsx
│   └── vite.config.js
│
└── server/
    ├── routes/
    ├── middlewares/
    ├── controllers/
    ├── models/
    ├── utils/
    │   ├── db.js
    |   ├── email.js
    │   └── ws.js               # Socket.io handlers
    └── index.js
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/docs/all` | Get all docs |
| POST | `/api/docs/create` | Create doc |
| GET | `/api/docs/:id` | Get single doc |
| POST | `/api/docs/update/:id` | Update doc content |
| DELETE | `/api/docs/:id` | Delete doc |

---

## 🤝 Contributing

If you know how to fix the Excalidraw freedraw + Socket.io issue, please open a PR or issue. The exact reproduction steps are documented in the **Known Issue** section above.

---

## 📄 License

MIT

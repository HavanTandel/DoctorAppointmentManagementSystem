// console.log("Server file is running!");
// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import connectDB from "./config/mongodb.js"; // MongoDB connection
// import adminRouter from "./routes/adminRoute.js";
// import doctorRouter from "./routes/doctorRoute.js";
// import userRouter from "./routes/usersRoute.js";
// import mongoose from "mongoose";
// // App setup
// const app = express();
// const port = process.env.PORT || 4000;

// // Connect to MongoDB
// connectDB();

// // Middlewares
// app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:5174",
//   credentials: true
// }));

// // Routes
// app.use("/api/admin", adminRouter);
// app.use("/api/doctor", doctorRouter);
// app.use("/api/user", userRouter);

// // Test route
// app.get("/", (req, res) => {
//   res.send("Hello! Server is running smoothly. 😎");
// });

// // 404 handler
// app.use((req, res, next) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Internal Server Error" });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
console.log("Server file is running!");

import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/mongodb.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/usersRoute.js";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App setup
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());

// ✅ CORS for development + production
app.use(cors({
  origin: "*",   // change to your domain later
  credentials: true
}));

// API Routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// ==============================
// ✅ Serve Frontend (IMPORTANT)
// ==============================

// If using Vite → build folder is "dist"
// If using CRA → folder is "build"
// Change accordingly

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// Error Handling
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Database
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/eventRoutes");

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

// Initialize Express
const app = express();

// ================================
// Middleware
// ================================

// Parse JSON Requests
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

// ================================
// API Routes
// ================================

app.use("/api/auth", authRoutes);

app.use("/api/event", eventRoutes);

// ================================
// Static Client Folder
// ================================

app.use(express.static(path.join(__dirname, "../client")));

// ================================
// Home Page
// ================================

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "../client/index.html"));

});

// ================================
// 404 Page
// ================================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found"

    });

});

// ================================
// Start Server
// ================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("=================================");
    console.log("🚀 CONNECTION 2026 SERVER STARTED");
    console.log("=================================");
    console.log(`🌐 Server : http://localhost:${PORT}`);
    console.log("✅ MongoDB Connected");
    console.log("=================================");

});
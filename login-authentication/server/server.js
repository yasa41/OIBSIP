import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Establish database connection
connectDB();

// Resolve directory paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5501"], credentials: true,
    })
);

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "../client")));

// Authentication routes
app.use("/api/auth", authRouter);

// Handle unknown routes by serving the login page
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/login.html"));
});

// Start the server
app.listen(port, () => console.log(`✅ Server running at http://localhost:${port}`));

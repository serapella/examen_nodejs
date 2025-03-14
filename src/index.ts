import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import snippetRoutes from "./routes/snippetRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

// Routes
app.use("/", snippetRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

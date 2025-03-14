import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import router from "./routes/snippetRoutes";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use("/", router);

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

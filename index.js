// api/index.js — VERSÃO FINAL CORRIGIDA (PostgreSQL + Render)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./db.js";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/users.js";
import refererRoutes from "./routes/referers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

// ===== FIX __dirname EM ES MODULE =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== CORS =====
app.use(cors({
  origin: "https://crud-cad-funcionario.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ===== MIDDLEWARE =====
app.use(express.json());

// ===== ROTAS API =====
app.use("/users", userRoutes);
app.use("/referers", refererRoutes);

// ===== SERVIR FRONTEND =====
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});

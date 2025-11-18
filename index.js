// api/index.js  ← VERSÃO FINAL CORRIGIDA (PostgreSQL + Render)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db.js";

import userRoutes from "./routes/users.js";
import refererRoutes from "./routes/referers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.use("/users", userRoutes);
app.use("/referers", refererRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API rodando na Render!" });
});

// TESTE DE CONEXÃO POSTGRESQL (substitui o MySQL)
const testDbConnection = async () => {
  try {
    await db.query("SELECT 1");
    console.log("PostgreSQL conectado com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar ao PostgreSQL:", err.message);
    process.exit(1);
  }
};

testDbConnection();

// INICIA O SERVIDOR
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});

// api/index.js — VERSÃO FINAL CORRIGIDA (PostgreSQL + Render)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./db.js";

import userRoutes from "./routes/users.js";
import refererRoutes from "./routes/referers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

// Permitir requisições do frontend (CORS)
app.use(cors({
  origin: "https://crud-cad-funcionario.onrender.com", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware para interpretar JSON no body
app.use(express.json());

// Rotas
app.use("/users", userRoutes);
app.use("/referers", refererRoutes);

// Rota teste da API
app.get("/", (req, res) => {
  res.json({ message: "API rodando na Render!" });
});

// TESTE DE CONEXÃO COM POSTGRESQL + PRISMA
const testDb = async () => {
  try {
    await prisma.$connect();
    console.log("PostgreSQL + Prisma conectado com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar com Prisma:", err.message);
    process.exit(1);
  }
};

testDb();

// INICIA O SERVIDOR
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});

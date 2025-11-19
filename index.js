// api/index.js  ← VERSÃO FINAL CORRIGIDA (PostgreSQL + Render)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./db.js";

import userRoutes from "./routes/users.js";
import refererRoutes from "./routes/referers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/referers", refererRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API rodando na Render!" });
});

// TESTE DE CONEXÃO POSTGRESQL (substitui o MySQL)
const testDb = async () => {
  try {
    await prisma.$connect()
    console.log("PostgreSQL + Prisma conectado com sucesso!")
  } catch (err) {
    console.error("Erro ao conectar com Prisma:", err.message)
    process.exit(1)
  }
}

testDb()

// INICIA O SERVIDOR
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});

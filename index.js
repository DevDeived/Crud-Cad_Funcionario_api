// api/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db.js";

import userRoutes from "./routes/users.js";
import refererRoutes from "./routes/referers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

// CORS configurado para o domínio do frontend no deploy
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // EX: "https://meu-front.onrender.com"
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// ROTAS
app.use("/users", userRoutes);        
app.use("/referers", refererRoutes);

// Rota padrão
app.get("/", (req, res) => {
  res.json({ message: "API rodando na Render!" });
});


db.getConnection((err) => {
  if (err) {
    console.error("❌ Erro ao conectar ao MySQL:", err.message);
    process.exit(1);
  } else {
    console.log("✅ Conectado ao MySQL com sucesso!");
  }
});

// Start do servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});

import express from "express";
import cors from "cors";
import { db } from "./db.js";
import userRoutes from "./routes/users.js";
import refererRoutes from "./routes/referers.js";

const app = express();
const PORT = process.env.PORT || 8800;

app.use(cors());
app.use(express.json());

// ROTAS
app.use("/", userRoutes);        
app.use("/referers", refererRoutes); 

app.get("/", (req, res) => {
  res.json({ message: "API rodando!" });
});

db.getConnection((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    process.exit(1);
  } else {
    console.log("Conectado ao MySQL!");
  }
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
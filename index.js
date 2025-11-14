// backend/server.js
import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use("/", userRoutes);

// Iniciar servidor
const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
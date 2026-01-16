import express from "express";
import cors from "cors";

const app = express();

// Permite que apenas seu front-end acesse a API
app.use(cors({
  origin: "https://crud-cad-funcionario.onrender.com",
  credentials: true, // necessário se você usar cookies ou autenticação
}));

app.use(express.json()); // para poder ler JSON no body das requisições

// Suas rotas
app.post("/referers/login", async (req, res) => {
  const { email, senha } = req.body;
  // lógica de login
  res.json({ message: "Login recebido!" });
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
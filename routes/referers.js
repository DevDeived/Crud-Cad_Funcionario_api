// api/routes/referers.js
import express from "express";
import prisma from "../db.js";
import md5 from "md5";

const router = express.Router();

// CADASTRO DE ADMIN (POST /referers)
router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const existe = await prisma.referer.findUnique({ where: { email } });
    if (existe) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const novo = await prisma.referer.create({
      data: { nome, email, senha: md5(senha) },
    });

    const { senha: _, ...dados } = novo;
    res.status(201).json(dados);
  } catch (err) {
    console.error("Erro ao cadastrar:", err);
    res.status(500).json({ error: "Erro ao cadastrar" });
  }
});

// LOGIN DE ADMIN (POST /referers/login)
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    const referer = await prisma.referer.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!referer || referer.senha !== md5(senha)) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    const { senha: _, ...dados } = referer;
    res.json(dados);
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

export default router;
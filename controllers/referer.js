// api/controllers/referer.js
import prisma from "../db.js";
import md5 from "md5";

// Buscar referer por email (LOGIN)
export const getRefererByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const referer = await prisma.referer.findUnique({
      where: { email },
    });

    if (!referer) {
      return res.status(404).json({ error: "Referer não encontrado" });
    }

    res.json(referer);
  } catch (err) {
    console.error("Erro ao buscar referer:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

// Criar referer (CADASTRO)
export const createReferer = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    // Verifica se já existe
    const existe = await prisma.referer.findUnique({ where: { email } });
    if (existe) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const senhaHash = md5(senha); // ← hash da senha

    const novoReferer = await prisma.referer.create({
      data: {
        nome,
        email,
        senha: senhaHash,
      },
    });

    res.status(201).json(novoReferer);
  } catch (err) {
    console.error("Erro ao criar referer:", err);
    res.status(500).json({ error: "Erro ao cadastrar referer" });
  }
};
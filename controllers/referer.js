// api/controllers/referer.js
import { db } from "../db.js";   // ← agora usa { db } porque você exportou como named

// Buscar referer por email
export const getRefererByEmail = async (req, res) => {
  const { email } = req.params;

  if (!email) return res.status(400).json({ error: "Email é obrigatório" });

  try {
    const referer = await db.referer.findUnique({
      where: { email }, // ← correto
    });

    if (!referer) return res.status(404).json({ error: "Referer não encontrado" });

    res.json(referer);
  } catch (err) {
    console.error("Erro ao buscar referer:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

// Criar referer
export const createReferer = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha)
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });

  try {
    const referer = await db.referer.create({
      data: { nome, email, senha },
    });
    res.status(201).json(referer);
  } catch (err) {
    console.error("Erro ao cadastrar referer:", err);
    res.status(500).json({ error: "Erro ao cadastrar" });
  }
};
// api/routes/referers.js
import express from "express";
import { getRefererByEmail, createReferer } from "../controllers/referer.js";

const router = express.Router();

// ROTA DE CADASTRO (POST /referers)
router.post("/", createReferer);

// ROTA DE LOGIN (POST /referers/login) ← A QUE VOCÊ QUERIA!
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    const referer = await getRefererByEmailLogic(email, senha); // Função auxiliar abaixo

    if (!referer) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    const { senha: _, ...dadosReferer } = referer;
    res.json(dadosReferer);
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// FUNÇÃO REUTILIZÁVEL PARA BUSCAR E VALIDAR
async function getRefererByEmailLogic(email, senhaPlana) {
  const prisma = (await import("../db.js")).default;
  const md5 = (await import("md5")).default;

  const referer = await prisma.referer.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  if (!referer) return null;

  const senhaHash = md5(senhaPlana);
  if (referer.senha !== senhaHash) return null;

  return referer;
}

export default router;
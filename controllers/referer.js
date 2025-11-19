import prisma from "../db.js";
import md5 from "md5";

// BUSCAR REFERER POR EMAIL + VALIDAR SENHA (LOGIN)
export const getRefererByEmail = async (req, res) => {
  const { email } = req.params;
  const senhaHasheada = req.query.senha; // ← frontend manda md5(senha)

  if (!email || !senhaHasheada) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    const referer = await prisma.referer.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!referer) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    // Compara os dois hashes (ambos em md5)
    if (referer.senha !== senhaHasheada) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    // Remove a senha antes de enviar pro frontend
    const { senha, ...dadosReferer } = referer;
    res.json(dadosReferer);

  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

// CRIAR REFERER (CADASTRO) — continua igual
export const createReferer = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const existe = await prisma.referer.findUnique({ where: { email } });
    if (existe) {
      return res.status(400).json({ error: "Este email já está cadastrado" });
    }

    const senhaHash = md5(senha);

    const novoReferer = await prisma.referer.create({
      data: {
        nome,
        email,
        senha: senhaHash,
      },
    });

    const { senha: _, ...refererCriado } = novoReferer;
    res.status(201).json(refererCriado);
  } catch (err) {
    console.error("Erro ao cadastrar referer:", err);
    res.status(500).json({ error: "Erro ao cadastrar" });
  }
};
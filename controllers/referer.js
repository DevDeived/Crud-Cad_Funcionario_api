// api/controllers/referer.js
import prisma from "../db.js";
import md5 from "md5";

// BUSCAR REFERER POR EMAIL + VALIDAR SENHA (LOGIN)
export const getRefererByEmail = async (req, res) => {
  const { email } = req.params;
  const senhaEnviada = req.query.senha; // ← frontend manda ?senha=123456

  // Validação básica
  if (!email || !senhaEnviada) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    const referer = await prisma.referer.findUnique({
      where: { email },
    });

    // Se não existir OU senha não bater → mesma mensagem (segurança)
    if (!referer || referer.senha !== md5(senhaEnviada)) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    // Remove a senha antes de enviar pro frontend
    const { senha, ...refererSemSenha } = referer;

    res.json(refererSemSenha);
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// CRIAR REFERER (CADASTRO DE ADMIN)
export const createReferer = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    // Verifica se já existe
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

    // Não retorna a senha
    const { senha: _, ...refererCriado } = novoReferer;
    res.status(201).json(refererCriado);
  } catch (err) {
    console.error("Erro ao cadastrar referer:", err);
    res.status(500).json({ error: "Erro ao cadastrar. Tente novamente." });
  }
};
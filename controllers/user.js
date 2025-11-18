// api/controllers/user.js
import { db } from "../db.js";

// Listar todos os usuários
export const getUsers = async (req, res) => {
  try {
    const users = await db.user.findMany({
      include: { referer: true }, // traz os dados do referer junto
      orderBy: { nome: "asc" },
    });
    res.json(users);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

// Criar usuário
export const createUser = async (req, res) => {
  const { nome, beneficiario, cidade, fone, data_nascimento, pix, refererId } = req.body;

  if (!nome) return res.status(400).json({ error: "Nome é obrigatório" });

  try {
    const user = await db.user.create({
      data: {
        nome,
        beneficiario,
        cidade,
        fone,
        data_nascimento,
        pix,
        refererId: refererId ? Number(refererId) : null, // ← campo correto
      },
    });
    res.status(201).json(user);
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

// Atualizar usuário
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, beneficiario, cidade, fone, data_nascimento, pix, refererId } = req.body;

  try {
    const user = await db.user.update({
      where: { id: Number(id) },
      data: {
        nome,
        beneficiario,
        cidade,
        fone,
        data_nascimento,
        pix,
        refererId: refererId ? Number(refererId) : null,
      },
    });
    res.json(user);
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

// Deletar usuário
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await db.user.delete({ where: { id: Number(id) } });
    res.json({ message: "Deletado com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

// Listar usuários por referer
export const getUsersByReferer = async (req, res) => {
  const { refererId } = req.params;

  try {
    const users = await db.user.findMany({
      where: { refererId: Number(refererId) },
      include: { referer: true },
      orderBy: { nome: "asc" },
    });
    res.json(users);
  } catch (err) {
    console.error("Erro ao buscar usuários por referer:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};
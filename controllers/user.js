// api/controllers/user.js
import prisma from "../db.js";

// Listar todos os usuários
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
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
  const { nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id } = req.body;

  if (!nome) return res.status(400).json({ error: "Nome é obrigatório" });

  try {
    const user = await prisma.users.create({
      data: { nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id },
    });
    res.json(user);
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

// Atualizar usuário
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id } = req.body;

  if (!id) return res.status(400).json({ error: "ID é obrigatório" });

  try {
    await prisma.users.update({
      where: { id: Number(id) },
      data: { nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id },
    });
    res.json({ message: "Atualizado com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

// Deletar usuário
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.users.delete({ where: { id: Number(id) } });
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
    const users = await prisma.users.findMany({
      where: { referer_id: Number(refererId) },
      orderBy: { nome: "asc" },
    });
    res.json(users);
  } catch (err) {
    console.error("Erro ao buscar usuários por referer:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

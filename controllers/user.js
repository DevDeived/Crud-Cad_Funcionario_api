// api/controllers/user.js
import { db } from "../db.js";

export const getUsers = (req, res) => {
  const q = "SELECT * FROM users ORDER BY nome";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro ao buscar usuários:", err);
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
    res.json(data);
  });
};

export const createUser = (req, res) => {
  const { nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id } = req.body;

  if (!nome) {
    return res.status(400).json({ error: "Nome é obrigatório" });
  }

  const q = `
    INSERT INTO users 
    (nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    q,
    [nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id],
    (err, result) => {
      if (err) {
        console.error("Erro ao criar usuário:", err);
        return res.status(500).json({ error: "Erro ao criar usuário" });
      }

      res.json({
        id: result.insertId,
        nome,
        beneficiario,
        cidade,
        fone,
        data_nascimento,
        pix,
        referer_id,
      });
    }
  );
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID é obrigatório" });
  }

  const q = `
    UPDATE users 
    SET nome=?, beneficiario=?, cidade=?, fone=?, data_nascimento=?, pix=?, referer_id=?
    WHERE id=?
  `;

  db.query(
    q,
    [nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id, id],
    (err) => {
      if (err) {
        console.error("Erro ao atualizar usuário:", err);
        return res.status(500).json({ error: "Erro ao atualizar usuário" });
      }

      res.json({ message: "Atualizado com sucesso" });
    }
  );
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM users WHERE id = ?";

  db.query(q, [id], (err) => {
    if (err) {
      console.error("Erro ao deletar usuário:", err);
      return res.status(500).json({ error: "Erro ao deletar usuário" });
    }

    res.json({ message: "Deletado com sucesso" });
  });
};

export const getUsersByReferer = (req, res) => {
  const { refererId } = req.params;

  const q = "SELECT * FROM users WHERE referer_id = ? ORDER BY nome";

  db.query(q, [refererId], (err, data) => {
    if (err) {
      console.error("Erro ao buscar usuários por referer:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }

    res.json(data);
  });
};

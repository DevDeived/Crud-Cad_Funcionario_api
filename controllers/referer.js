// backend/controllers/referer.js
import { db } from "../db.js";

export const getRefererByEmail = (req, res) => {
  const { email } = req.params;
  const q = "SELECT * FROM referers WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (err) {
      console.error("Erro ao buscar referer:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(data[0]);
  });
};

export const createReferer = (req, res) => {
  const { nome, email, senha } = req.body;
  const q = "INSERT INTO referers (nome, email, senha) VALUES (?, ?, ?)";

  db.query(q, [nome, email, senha], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar admin:", err);
      return res.status(500).json({ error: "Erro ao cadastrar" });
    }
    res.json({ id: result.insertId, nome, email });
  });
};
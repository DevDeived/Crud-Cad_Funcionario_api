// controllers/user.js
import { db } from "../db.js";

// GET ALL
export const getUsers = (req, res) => {
  const q = "SELECT * FROM users ORDER BY nome";
  db.query(q, (err, data) => {
    if (err) {
      console.error("ERRO NO SQL (GET):", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(data);
  });
};

// CREATE
export const createUser = (req, res) => {
  const { nome, beneficiario, cidade, fone, data_nascimento, pix } = req.body;

  const q = `
    INSERT INTO users 
    (nome, beneficiario, cidade, fone, data_nascimento, pix) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(q, [nome, beneficiario, cidade, fone, data_nascimento, pix], (err, result) => {
    if (err) {
      console.error("ERRO NO SQL (CREATE):", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// UPDATE
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { nome, beneficiario, cidade, fone, data_nascimento, pix } = req.body;

  const q = `
    UPDATE users SET 
    nome=?, beneficiario=?, cidade=?, fone=?, data_nascimento=?, pix=? 
    WHERE id=?
  `;

  db.query(q, [nome, beneficiario, cidade, fone, data_nascimento, pix, id], (err) => {
    if (err) {
      console.error("ERRO NO SQL (UPDATE):", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Atualizado com sucesso" });
  });
};

// DELETE
export const deleteUser = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM users WHERE id = ?";

  db.query(q, [id], (err) => {
    if (err) {
      console.error("ERRO NO SQL (DELETE):", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Excluído com sucesso" });
  });
};
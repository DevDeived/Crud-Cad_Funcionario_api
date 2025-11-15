import { db } from "../db.js";

export const getUsers = (req, res) => {
  const q = "SELECT * FROM users ORDER BY nome";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

export const createUser = (req, res) => {
  const { nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id } = req.body;
  const q = `
    INSERT INTO users (nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(q, [nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id } = req.body;
  const q = `
    UPDATE users SET nome=?, beneficiario=?, cidade=?, fone=?, data_nascimento=?, pix=?, referer_id=?
    WHERE id=?
  `;
  db.query(q, [nome, beneficiario, cidade, fone, data_nascimento, pix, referer_id, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json("Atualizado com sucesso");
  });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM users WHERE id = ?";
  db.query(q, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json("Deletado com sucesso");
  });
};

export const getUsersByReferer = (req, res) => {
  const { refererId } = req.params;
  const q = "SELECT * FROM users WHERE referer_id = ? ORDER BY nome";
  db.query(q, [refererId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};
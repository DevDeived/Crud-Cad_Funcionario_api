// api/routes/users.js
import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsersByReferer,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);            // GET /users
router.post("/", createUser);         // POST /users
router.put("/:id", updateUser);       // PUT /users/5
router.delete("/:id", deleteUser);    // DELETE /users/5

// ROTA CORRIGIDA
router.get("/referer/:refererId", getUsersByReferer); 
// Fica: GET /users/referer/1

export default router;

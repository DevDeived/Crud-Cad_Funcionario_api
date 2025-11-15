import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsersByReferer,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/users/:refererId", getUsersByReferer);

export default router;
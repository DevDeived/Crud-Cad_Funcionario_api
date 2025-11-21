import express from "express";
import { getRefererByEmail, createReferer, loginReferer } from "../controllers/referer.js";

const router = express.Router();

router.get("/login", loginReferer);
router.post("/", createReferer);

export default router;

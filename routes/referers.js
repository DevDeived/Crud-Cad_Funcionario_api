// api/routes/referers.js
import express from "express";
import { getRefererByEmail, createReferer } from "../controllers/referer.js";

const router = express.Router();

router.get("/:email", getRefererByEmail);
router.post("/", createReferer);

export default router;

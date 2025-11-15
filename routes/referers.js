// backend/routes/referers.js
import express from "express";
import { getRefererByEmail, createReferer } from "../controllers/referer.js"; // IMPORT CORRETO

const router = express.Router();

router.get("/:email", getRefererByEmail);
router.post("/", createReferer); 

export default router;
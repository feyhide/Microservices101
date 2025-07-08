import express from "express";
import { createSnippet, getSnippets } from "../controllers/snippet.js";

const router = express.Router();

router.post("/create", createSnippet);
router.get("/get", getSnippets);

export default router;

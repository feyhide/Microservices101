import express from "express";
import { createSnippet, getSnippet } from "../controller/snippet.js";

const router = express.Router();

router.post("/create", createSnippet);
router.get("/get", getSnippet);

export default router;

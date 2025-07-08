import express from "express";
import { createComment, getCommentsBySnippet } from "../controllers/comment.js";

const router = express.Router();

router.post("/:id/create", createComment);
router.get("/:id/get", getCommentsBySnippet);

export default router;

import express from "express";
import { createComment, getCommentBySnippet } from "../controller/comment.js";

const router = express.Router();

router.post("/:id/create", createComment);
router.get("/:id/get", getCommentBySnippet);

export default router;

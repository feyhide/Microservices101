import { randomBytes } from "crypto";
import { comments } from "../db/db.js";

export const createComment = (req, res) => {
  const { comment } = req.body || {};
  const snippetId = req.params.id;

  if (!comment || !snippetId) {
    return res.status(400).json({
      success: false,
      message: "Comment and Snippet ID are required",
    });
  }
  const id = randomBytes(4).toString("hex");

  if (!comments[snippetId]) {
    comments[snippetId] = [];
  }

  const newComment = {
    id,
    comment,
  };

  comments[snippetId].push(newComment);

  return res.status(201).json({
    success: true,
    message: `Comment added to snippet ${snippetId}`,
    data: newComment,
  });
};

export const getCommentBySnippet = (req, res) => {
  const snippetId = req.params.id;

  if (!snippetId) {
    return res.status(404).json({
      success: false,
      message: "Snippet Id is required",
    });
  }

  return res.status(200).json({
    success: true,
    message: `Comments for snippet ${snippetId} fetched successfully`,
    data: comments[snippetId] || [],
  });
};

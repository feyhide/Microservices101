import { randomBytes } from "crypto";
import { snippets } from "../db/db.js";

export const createSnippet = (req, res) => {
  const { title, code } = req.body || {};

  if (!title || !code) {
    return res.status(400).json({
      success: false,
      message: "Both title and code are required",
    });
  }

  const id = randomBytes(4).toString("hex");

  snippets[id] = {
    id,
    title,
    code,
  };

  return res.status(201).json({
    success: true,
    message: `Snippet created with id ${id}`,
    data: snippets[id],
  });
};

export const getSnippet = (req, res) => {
  return res.status(200).json({
    success: true,
    message: `Snippet fetched successfully`,
    data: snippets,
  });
};

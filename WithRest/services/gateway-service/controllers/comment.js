import { createCommentReq, getCommentsReq } from "../services/comment.js";

export const createComment = async (req, res) => {
  try {
    const response = await createCommentReq(req.params.id, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Comment Creation Error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });

    res.status(error.response?.status || 500).json({
      success: false,
      message: "Comment service error",
      error: error.response?.data || error.message,
    });
  }
};

export const getCommentsBySnippet = async (req, res) => {
  try {
    const response = await getCommentsReq(req.params.id);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Comment Fetch Error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });

    res.status(error.response?.status || 500).json({
      success: false,
      message: "Comment service error",
      error: error.response?.data || error.message,
    });
  }
};

import { createSnippetReq, getSnippetsReq } from "../services/snippet.js";

export const createSnippet = async (req, res) => {
  try {
    const response = await createSnippetReq(req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Snippet Creation Error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });

    res.status(error.response?.status || 500).json({
      success: false,
      message: "Snippet service error",
      error: error.response?.data || error.message,
    });
  }
};

export const getSnippets = async (req, res) => {
  try {
    const response = await getSnippetsReq();
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Snippet Fetch Error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });

    res.status(error.response?.status || 500).json({
      success: false,
      message: "Snippet service error",
      error: error.response?.data || error.message,
    });
  }
};

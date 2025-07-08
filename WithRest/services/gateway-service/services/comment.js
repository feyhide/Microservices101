import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const COMMENT_SERVICE = process.env.COMMENT_SERVICE_URL;

export const createCommentReq = (id, data) =>
  axios.post(`${COMMENT_SERVICE}/${id}/create`, data);

export const getCommentsReq = (id) => axios.get(`${COMMENT_SERVICE}/${id}/get`);

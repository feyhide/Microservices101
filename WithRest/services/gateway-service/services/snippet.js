import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const SNIPPET_SERVICE = process.env.SNIPPET_SERVICE_URL;

export const createSnippetReq = (data) =>
  axios.post(`${SNIPPET_SERVICE}/create`, data);

export const getSnippetsReq = () => axios.get(`${SNIPPET_SERVICE}/get`);

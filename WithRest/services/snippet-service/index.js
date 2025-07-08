import express from "express";
import snippetRoute from "./route/snippet.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/snippet", snippetRoute);

app.listen(PORT, () => {
  console.log(`Snippet Service is running on port ${PORT}`);
});

import express from "express";
import snippetRoute from "./route/snippet.js";
import cors from "cors";

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/v1/snippet", snippetRoute);

app.listen(PORT, () => {
  console.log(`Snippet Service is running on port ${PORT}`);
});

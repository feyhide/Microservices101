import express from "express";
import commentRoute from "./route/comment.js";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/comment", commentRoute);

app.listen(PORT, () => {
  console.log(`Comment Service is running on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import snippetRoutes from "./routes/snippet.js";
import commentRoutes from "./routes/comment.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/v1/snippet", snippetRoutes);
app.use("/api/v1/comment", commentRoutes);

app.listen(PORT, () => {
  console.log(`API Gateway running at port ${PORT}`);
});

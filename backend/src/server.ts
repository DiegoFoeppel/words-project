import express from "express";
import wordsRoutes from "./routes/wordsRoutes";
import quizRoutes from "./routes/quizRoutes";
import datasetRoutes from "./routes/datasetRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/words", wordsRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/sentences", datasetRoutes);

export { app };
export default app;

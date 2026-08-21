import express from "express";
import wordsRoutes from "./routes/wordsRoutes";

const app = express();

app.use(express.json());

app.use("/api", wordsRoutes);

export { app };
export default app;

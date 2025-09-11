import express from "express";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);

export default app;

import express from "express";
import connectDB from "./database/db.js";

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;

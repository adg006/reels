import app from "./src/app.js";
import dotenv from "dotenv/config";
import connectDB from "./src/database/db.js";

connectDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

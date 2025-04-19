import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
});

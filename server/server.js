import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
// import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import commentsRoutes from "./routes/comments.js";
import proposalsRoutes from "./routes/proposals.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
// app.use(morgan("common"));
// app.use(cors({ origin: true }));
// options security/////////
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({ origin: true, credentials: true }));
// Routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/comments", commentsRoutes);
app.use("/proposals", proposalsRoutes);

// Serve static assets
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("server is ready"));
}

// MongoDB/Mongoose Setup

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT} perfectly`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

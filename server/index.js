import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "32mb", extend: true }));
app.use(bodyParser.urlencoded({ limit: "32mb", extend: true }));
app.use(cors());

app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));

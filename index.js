import express from "express";
import { router } from "./routes/routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
console.log(PORT);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const url = MONGO_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error : "));
db.once("open", () => {
  console.info("Connected Successfully");
});
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.use("/api", router);
app.listen(PORT, () => {
  console.info(`The App is listening at ${PORT}`);
});

//For testing Purposes
export default app;

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/authRoutes.js";
import cors from "cors";
import RootRouter from "./routes/index.js";


dotenv.config();


const PORT = process.env.PORT

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(RootRouter);

await mongoose.connect(process.env.MONGO_URI);
app.use("/api/auth", router);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log("Server is running on port 8080");
})
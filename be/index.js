import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

await mongoose.connect(process.env.MONGO_URI);


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post("/products", (req, res) => {
    
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})
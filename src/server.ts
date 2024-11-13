// src/server.ts

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;

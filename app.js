import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from "cors";
import connectDB from "./config/connectdb.js";
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import trendingRoutes from './routes/trendingRoutes.js';

const app = express();
const port = process.env.PORT || 5000
const DATABASE_URL = process.env.DATABASE_URL

//CORS Policy
app.use(cors());

//Database Connection
connectDB(DATABASE_URL);

//JSON
app.use(express.json());

//Load Routes
app.use("/api/user", userRoutes);
app.use("/api/trending", productRoutes);
app.use("/api/trending", trendingRoutes);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
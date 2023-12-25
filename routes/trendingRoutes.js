import express from "express";
import TrendingController from "../controllers/Trending/trendingController.js";
import isAuthenticated from "../middlewares/auth-middleware.js";
const router = express.Router();

// Route Level Middleware - To Protect Route
router.use("/create-trend", isAuthenticated);
router.use("/update-trend/:id", isAuthenticated);
router.use("/delete-trend/:id", isAuthenticated);

//PROTECTED ROUTES
router.post("/create-trend", TrendingController.createTrend);
router.patch("/update-trend/:id", TrendingController.updateTrend);
router.delete("/delete-trend/:id", TrendingController.deleteTrend);

//PUBLIC ROUTES
router.get("/get-trend", TrendingController.getTrends);
router.get("/get-trend/:id", TrendingController.getTrend);


export default router;
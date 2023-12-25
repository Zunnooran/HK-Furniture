import express from "express";
import ProductController from "../controllers/products/products.js";
import isAuthenticated from "../middlewares/auth-middleware.js";
const router = express.Router();

// Route Level Middleware - To Protect Route
router.use("/create-product", isAuthenticated);
router.use("/update-product/:id", isAuthenticated);
router.use("/delete-product/:id", isAuthenticated);

//PROTECTED ROUTES
router.post("/create-product", ProductController.createProduct);
router.patch("/update-product/:id", ProductController.updateProduct);
router.delete("/delete-product/:id", ProductController.deleteProduct);

//PUBLIC ROUTES
router.get("/get-product", ProductController.getProducts);
router.get("/get-product/:id", ProductController.getProduct);


export default router;
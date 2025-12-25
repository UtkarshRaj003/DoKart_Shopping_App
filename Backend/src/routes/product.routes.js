const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const auth = require("../middleware/auth.middleware");

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Protected routes (admin only - we'll add role check later)
router.post("/", auth, productController.createProduct);
router.put("/:id", auth, productController.updateProduct);
router.delete("/:id", auth, productController.deleteProduct);

module.exports = router;

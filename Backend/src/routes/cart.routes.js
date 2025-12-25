const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const auth = require("../middleware/auth.middleware");

// All cart routes require authentication
router.get("/", auth, cartController.getCart);
router.post("/add", auth, cartController.addToCart);
router.put("/update", auth, cartController.updateCartItem);
router.delete("/remove", auth, cartController.removeFromCart);
router.delete("/clear", auth, cartController.clearCart);

module.exports = router;

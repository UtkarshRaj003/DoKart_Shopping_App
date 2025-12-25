const Product = require("../models/Product");

// Create product (admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, stock } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images: images || [],
      stock: stock || 0,
      createdBy: req.user._id, // from auth middleware
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all products (public)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "name email");

    res.json({
      count: products.length,
      products,
    });
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
  } catch (err) {
    console.error("Get product by ID error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields if provided
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (images) product.images = images;
    if (stock !== undefined) product.stock = stock;

    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

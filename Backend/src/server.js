require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// basic test route
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

// user routes (will create soon)
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express")
const mongooseConnect = require("./db")
const app = express();
const port = 3000;
const dotenv = require("dotenv")
const userRoutes = require("./src/routes/userRoutes")
const ProductsRoutes = require("./src/routes/productsRoutes")
const swaggerDocs = require("./swagger")

// Connect to MongoDB
mongooseConnect()

// Middleware
app.use(express.json());

// routes
app.use("/api/user", userRoutes)
app.use("/api/products", ProductsRoutes)

// Swagger Documentation
swaggerDocs(app);

// Root route
app.get("/", (req, res) => {
    res.send("🚀 Welcome to Express + MongoDB API!");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
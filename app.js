const express = require("express")
const dotenv = require("dotenv")
const userRoutes = require("./src/routes/userRoutes")
const ProductsRoutes = require("./src/routes/productsRoutes")
const ReviewRoutes = require("./src/routes/reviewRoutes")
const invoiceRoutes = require("./invoiceRoutes")
const orderRoutes = require("./src/routes/order")
const swaggerDocs = require("./swagger")
const path = require("path");
const mongooseConnect = require("./db")

const app = express();
const port = 3000;

// Connect to MongoDB
mongooseConnect()

// Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Middleware
app.use(express.json());

// routes
app.use("/api/user", userRoutes)
app.use("/api/products", ProductsRoutes)
app.use("/api/reviews", ReviewRoutes)
app.use("/api/invoice", invoiceRoutes)
app.use("/api/orders", orderRoutes)
// app.use("/api/invoices", express.static(path.join(__dirname, "invoices")));

// Swagger Documentation
swaggerDocs(app);

// Root route
app.get("/", (req, res) => {
    res.send("🚀 Welcome to Express + MongoDB API!");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
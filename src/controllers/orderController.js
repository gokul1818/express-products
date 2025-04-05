const Orders = require("../models/orders");
const Users = require("../models/user");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
// ✅ Register the multiply helper
handlebars.registerHelper("multiply", function (price, quantity) {
    return price * quantity;
});
// Generate Order ID by incrementing the last order ID
async function generateOrderId() {
    const lastOrder = await Orders.find().sort({ orderId: -1 }).limit(1).exec();
    let newOrderNumber = 1000;
    if (lastOrder[0] && lastOrder[0].orderId) {
        const lastOrderNumber = parseInt(lastOrder[0].orderId.replace("ORD", ""), 10);
        console.log('lastOrderNumber: ', lastOrderNumber);
        newOrderNumber = lastOrderNumber + 1;
    }

    return `ORD${newOrderNumber}`;
}

// Generate Invoice PDF from HBS template
async function generateInvoice(order) {

    try {
        const orderData = order.toObject();
        const templatePath = path.join(__dirname, "../../views/invoice.hbs");
        const fileName = `invoice-${Date.now()}.pdf`;
        const outputPath = path.join(__dirname, "../../invoices", fileName);

        // 🔧 Register helpers
        handlebars.registerHelper("multiply", (a, b) => a * b);
        handlebars.registerHelper("inc", value => parseInt(value) + 1);
        handlebars.registerHelper("currency", value => `₹ ${parseFloat(value).toFixed(2)}`);

        // ✅ Read and compile HBS template
        const templateSource = fs.readFileSync(templatePath, "utf-8");
        const compiledTemplate = handlebars.compile(templateSource, {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        });
        const html = compiledTemplate(orderData);

        // 2. Generate PDF with Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });
        const pdfBuffer = await page.pdf({ path: outputPath, format: "A4" });

        await browser.close();
        return pdfBuffer;
    } catch (error) {
        console.error("Invoice generation error:", error.message);
        throw new Error("Failed to generate invoice");
    }
}

// Create a new order and generate an invoice
const createOrder = async (req, res) => {
    try {
        const { userId, productsDetails, totalPrice, shippingAddress, paymentStatus, paymentMethod } = req.body;

        // ✅ Validate User
        const user = await Users.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Generate unique Order ID
        const orderId = await generateOrderId();

        // ✅ Create new Order
        const newOrder = new Orders({
            userId,
            productsDetails,
            shippingAddress,
            orderId,
            totalPrice,
            orderStatus: "Pending",
            paymentMethod,
            paymentStatus,
            orderDate: new Date(),
        });

        await newOrder.save();

        // ✅ Generate Invoice PDF
        const pdfBuffer = await generateInvoice(newOrder);
        console.log("PDF Generated Successfully");

        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        console.error("Error creating order:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createOrder };

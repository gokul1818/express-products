const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

// Generate Invoice Route
router.post("/generate", async (req, res) => {
    try {
        const invoiceData = {
            customerName: req.body.customerName || "Test Customer",
            date: new Date().toLocaleDateString(),
            items: req.body.items || [
                { name: "Product A", qty: 2, price: 100 },
                { name: "Product B", qty: 1, price: 50 }
            ],
            total: req.body.total || 250
        };

        const templatePath = path.join(__dirname, "./views/invoice.hbs");
        const fileName = `invoice-${Date.now()}.pdf`;
        const outputPath = path.join(__dirname, "./invoices", fileName);

        // 1. Read and compile Handlebars template
        const templateSource = fs.readFileSync(templatePath, "utf-8");
        const compiledTemplate = handlebars.compile(templateSource);
        const html = compiledTemplate(invoiceData);

        // 2. Generate PDF with Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });
        await page.pdf({ path: outputPath, format: "A4" });
        await browser.close();

        res.status(200).json({
            message: "Invoice generated successfully",
            url: `/api/invoices/${fileName}`
        });
    } catch (error) {
        console.error("Invoice generation error:", error);
        res.status(500).json({ message: "Failed to generate invoice" });
    }
});

module.exports = router;

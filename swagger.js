const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger Definition
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Express API with MongoDB",
        version: "1.0.0",
        description: "API documentation for the Express.js and MongoDB project",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "",
        },
        {
            url: "http://localhost:3001",
            description: "",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./src/routes/*.js"], // Path to the route files
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger docs available at http://localhost:3000/api-docs");
};

module.exports = swaggerDocs;

const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const { version } = require("../../package.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Attendance API Docs",
      version,
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"],
};

const swaggerSpec = swaggerjsdoc(options);

function swaggerDocs(app, port) {
  // Swagger page
  app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;

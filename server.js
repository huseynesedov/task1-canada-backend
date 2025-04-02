const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const connectDB = require("./src/config/mongo.db");
const routes = require("./src/routes/routes");
const cors = require("cors");
const multer = require("multer");

// Load environment variables
dotenv.config();

const app = express();

// Middleware for CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "My API documentation",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000"
      },
    ],
  },
  apis: ["./src/swagger/*"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use("/api", routes);

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

startServer();

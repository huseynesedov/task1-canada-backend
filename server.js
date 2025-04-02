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
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
}));

// Configure Multer for file upload (store files in memory temporarily)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my project",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/swagger/*"], // Path to your swagger files
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use("/api", routes);

// Start the server and connect to the database
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Initialize the server
startServer();

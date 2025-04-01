const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./src/config/mongo.db");

const swaggerDocument = require("./src/config/swagger.doc.json");
const catalogRoutes = require("./src/routes/catalog.rotues");
const productRoutes = require("./src/routes/product.routes");
const searchRoutes = require("./src/routes/search.routes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/catalog", catalogRoutes);
app.use("/api/product", productRoutes);
app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

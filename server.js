const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./src/config/mongo.db");

const swaggerDocument = require("./src/config/swagger.doc.json");
const rotues = require("./src/routes/routes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/swagger/index.html", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", rotues);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

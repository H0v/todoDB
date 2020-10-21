const express = require("express");
const routes = require("../server/routes/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/connectDB");
const errorHandler = require("./middleware/errorHandler");
const app = express();
dotenv.config({ path: "./config/.env" });
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
connectDB();
app.use(errorHandler);
app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});

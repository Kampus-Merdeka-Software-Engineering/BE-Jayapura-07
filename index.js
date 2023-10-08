require("dotenv").config();
const express = require("express") // ini perlu
const cors = require("cors")

// init express server and router
const app = express();
const productRouter = require('./app/routes/product-routes');
const transactionRouter = require('./app/routes/transaction-routes');

app.use(express.json()); // supaya express bisa response json
app.use(cors());
// http router prefix
app.use("/api/products", productRouter);
app.use("/api/transaction", transactionRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Express API running in port: " + process.env.APP_PORT);
  });

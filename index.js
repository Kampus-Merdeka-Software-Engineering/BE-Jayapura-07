require("dotenv").config();
const express = require("express") // ini perlu
const cors = require("cors")
const fs = require("fs")

// init express server and router
const app = express();
const productRouter = require('./app/routes/product-routes');
const transactionRouter = require('./app/routes/transaction-routes');
const { sequelize } = require("./app/models");

const conn = new sequelize.Sequelize("mysql://avnadmin:AVNS_aPDvO8-2hjmhfvNaDWc@vetemens-captone-jayapura-07.aivencloud.com:28237/defaultdb?ssl-mode=REQUIRED",{
    ssl: fs.readFileSync(path.join(__dirname, 'ca.pem')),
    dialect: 'mysql',
    logging: false

}
)


app.use(express.json()); // supaya express bisa response json
app.use(cors());
// http router prefix
app.use("/api/products", productRouter);
app.use("/api/transaction", transactionRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Express API running in port: " + process.env.APP_PORT);
  });

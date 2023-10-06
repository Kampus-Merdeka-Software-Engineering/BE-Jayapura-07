const express = require('express');
const transactionRouter = express.Router();
const TransactionController = require("../controllers/TransactionController");

/* route init */
// transaction router
transactionRouter.post("/", TransactionController.createTransaction)

module.exports = transactionRouter;
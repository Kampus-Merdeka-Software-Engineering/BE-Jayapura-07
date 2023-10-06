const express = require('express');
const productRouter = express.Router();
const ProductController = require("../controllers/ProductController");

/* route init */
// Product
productRouter.get('/', ProductController.getAllProducts);
productRouter.get("/:slug", ProductController.getProductBySlug)
productRouter.post("/", ProductController.createProduct)
productRouter.put("/edit/:slug", ProductController.updateProduct)
productRouter.delete("/:slug", ProductController.deleteProduct)

module.exports = productRouter;
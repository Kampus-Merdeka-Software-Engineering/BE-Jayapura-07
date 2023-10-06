const {Transaction, TransactionDetail, Product} = require("../models")

const createTransaction = async (req, res) =>
{
    const transactions = await Transaction.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        shipping_method: req.body.shipping_method,
    })

    const transactionData = req.body.details.map((detail) => ({
        transaction_id: transactions.id,
        product_id: detail.product_id,
        color: detail.color,
        size: detail.size,
        qty: detail.qty,
    }));

    await TransactionDetail.bulkCreate(transactionData);
    res.status(200).json({
        meta: {
            code: 200,
            status: "success",
            message: "Successfully create products"
        },
        data: transactions
    })
}

module.exports = {
    createTransaction
}
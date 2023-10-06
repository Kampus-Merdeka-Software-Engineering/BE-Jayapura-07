module.exports = (sequelize, DataTypes) => {
    const TransactionDetail = sequelize.define("TransactionDetail", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        transactionId: {
            field: "transaction_id",
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            field: "product_id",
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, 
    {
        timestamps: false,
        tableName: "transaction_details"
    });
    TransactionDetail.associate = (models) => {
        TransactionDetail.belongsTo(models.Transaction, {foreignKey: "transaction_id"});
    }
    TransactionDetail.associate = (models) => {
        TransactionDetail.belongsTo(models.Product, {foreignKey: "product_id"});
    }
    return TransactionDetail;
}
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shipping_method: {
            type: DataTypes.ENUM("Same Day", "Reguler", "Kargo"),
            allowNull: false
        }
    }, 
    {
        timestamps: false,
        tableName: "transactions"
    });
    Transaction.associate = (models) => {
        Transaction.hasMany(models.TransactionDetail, {foreignKey: "transaction_id"});
    }
    return Transaction;
}
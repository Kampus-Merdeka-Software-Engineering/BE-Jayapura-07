module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
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
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, 
    {
        timestamps: false,
        tableName: "products"
    });

    Product.associate = (models) => {
        Product.hasMany(models.ProductColor, {foreignKey: "product_id"});
        Product.hasMany(models.TransactionDetail, {foreignKey: "product_id"});
    }
    return Product;
}
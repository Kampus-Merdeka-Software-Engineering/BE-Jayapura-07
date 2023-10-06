module.exports = (sequelize, DataTypes) => {
    const ProductColor = sequelize.define("ProductColor", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, 
    {
        timestamps: false,
        tableName: "product_colors"
    });
    ProductColor.associate = (models) => {
        ProductColor.belongsTo(models.Product, {foreignKey: "product_id"});
    }
    return ProductColor;
}
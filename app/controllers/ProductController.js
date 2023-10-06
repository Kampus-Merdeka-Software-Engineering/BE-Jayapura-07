const {Product, ProductColor} = require("../models");

const getAllProducts = async (req, res, next) => {
    // console.log(Product.findAll());
    const products = await Product.findAll({include: ProductColor})
    res.status(200).json({
        meta: {
            code: 200,
            status: "success",
            message: "Successfully get all products"
        },
        data: products
    })
}

const getProductBySlug = async(req, res) => {
    const slug = req.params.slug;
    const product = await Product.findOne({
        where: {
            slug
        },
        include: [ProductColor]
    })
    if(!product)
    {
        res.status(404).json({
            meta: {
                code: 404,
                status: "error",
                message: "Failed get product by slug"
            },
            data: product
        })
    } else {
        res.status(200).json({
            meta: {
                code: 200,
                status: "success",
                message: "Successfully get all products"
            },
            data: product
        })
    }
}

const createProduct = async(req, res) => {
    const product = await Product.create({
        name: req.body.name,
        slug: req.body.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        price: req.body.price,
        description: req.body.description,
        image: req.body.image
    })
    // Menyiapkan data untuk ProductColor dengan menggunakan map
    const productColorData = req.body.colors.map((color) => ({
        product_id: product.id,
        color: color,
    }));

    // Menyisipkan data ProductColor menggunakan bulkCreate
    await ProductColor.bulkCreate(productColorData);

    res.status(200).json({
        meta: {
            code: 200,
            status: "success",
            message: "Successfully create products"
        },
        data: product
    })
}

const updateProduct = async (req, res) => {
    const slug = req.params.slug;
    const product = await Product.findOne({
        where: {
            slug
        },
        include: [ProductColor]
    })
    if(!product)
    {
        res.status(404).json({
            meta: {
                code: 404,
                status: "error",
                message: "Failed get product by slug"
            },
            data: product
        })
    } else
    {
        const editProduct = await Product.update({
            name: req.body.name,
            slug: req.body.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        },
        {
            where:{slug},
        })
        await ProductColor.destroy({
            where: {
                product_id: product.id
            }
        })
        // Menyiapkan data untuk ProductColor dengan menggunakan map
        const productColorData = req.body.colors.map((color) => ({
            product_id: product.id,
            color: color,
        }));

        // Menyisipkan data ProductColor menggunakan bulkCreate
        await ProductColor.bulkCreate(productColorData);

        res.status(200).json({
            meta: {
                code: 200,
                status: "success",
                message: "Successfully update products"
            },
        })
    }
    

}

const deleteProduct = async (req, res) => {
    const slug = req.params.slug;
    const product = await Product.findOne({
        where: {
            slug
        },
        include: [ProductColor]
    })
    if(!product)
    {
        res.status(404).json({
            meta: {
                code: 404,
                status: "error",
                message: "Failed get product by slug"
            },
            data: product
        })
    } else {
        await ProductColor.destroy({
            where: {
                product_id: product.id
            }
        })
        await Product.destroy({
            where: {
                slug: product.slug
            }
        })

        res.status(200).json({
            meta: {
                code: 200,
                status: "success",
                message: "Successfully delete product"
            },
        })
    }
}
module.exports = {
    getAllProducts,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct
}
import db from "../models/index"

const newProduct = async (req, res) => {
    try {
        const { productName, productSlug, description, originalPrice, sellingPrice, stock } = req.body

        const newProduct = await db.Product.create({
            productName: productName,
            description: description,
            productSlug: productSlug,
            originalPrice: originalPrice,
            sellingPrice: sellingPrice,
            stock: stock,
        });
        if (!newProduct) {
            return res.status(400).json({
                msg: 'Fail to add new product!'
            })
        } else {
            return res.status(200).json({
                msg: 'New product success!',
                newProduct: newProduct
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: '500 Server ' + error
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId
        const { productName, productSlug, description, originalPrice, sellingPrice, stock } = req.body
        const product = await db.Product.findOne({
            where: { id: productId }
        })
        if (!product) {
            return res.status(400).json({
                msg: 'Not found data!'
            })
        } else {
            product.update({
                productName: productName,
                description: description,
                productSlug: productSlug,
                originalPrice: originalPrice,
                sellingPrice: sellingPrice,
                stock: stock,
            }, {
                where: { id: productId }
            });

            return res.status(200).json({
                msg: 'Update product success!',
                product: product
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: '500 Server ' + error
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.size) || 10
        const offset = parseInt((req.query.page - 1) * limit) || 0

        const { count, rows } = await db.Product.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']],
        })

        if (count <= 0) {
            return res.status(400).json({
                msg: 'Not found data',
            })
        } else {
            return res.status(200).json({
                msg: 'Products',
                products: rows,
                totalRecords: count,
                perPage: limit,
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: '500 Server ' + error
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await db.Product.findByPk(req.params.productId)

        if (!product) {
            return res.status(400).json({
                msg: 'Not found data'
            })
        } else {
            return res.status(200).json({
                msg: 'Product',
                product: product
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: '500 Server ' + error
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId
        const product = await db.Product.findByPk(productId)
        if (!product) {
            return res.status(400).json({
                msg: 'Not found data!'
            })
        } else {
            product.destroy({
                where: { id: productId }
            })

            return res.status(200).json({
                msg: 'Delete product success!'
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: '500 Server ' + error
        })
    }
}

module.exports = {
    newProduct,
    updateProduct,
    getProducts,
    getProduct,
    deleteProduct,
}
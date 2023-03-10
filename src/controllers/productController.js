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
            const updateProduct = await db.Product.update({
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
                updateProduct: updateProduct
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
}
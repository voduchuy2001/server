import slugify from "slugify";
import db from "../models/index"

const newProduct = async (req, res) => {
    try {
        const { productName, description, originalPrice, sellingPrice, stock } = req.body
        const slug = slugify(productName, {
            replacement: '-',
            remove: undefined,
            lower: true,
            trim: true,
            locale: 'vi',
        })

        const newProduct = await db.Product.create({
            productName: productName,
            description: description,
            productSlug: slug,
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

module.exports = {
    newProduct,
}
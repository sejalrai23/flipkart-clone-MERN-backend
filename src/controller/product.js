const Products = require("../models/product");
const slugify = require("slugify");
const shortid = require("shortid");


exports.createProducts = (req, res) => {

    const { name, price, description, category, quantity, createdBy } = req.body;

    let productPics = [];
    if (req.files.length > 0) {
        productPics = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const product = new Products({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPics,
        category,
        quantity,
        createdBy: req.user._id

    });


    product.save((error, product) => {
        if (error) { return res.status(400).json(error) }
        if (product) {
            return res.status(200).json({ product })
        }
    })
    // res.status(200).json({ file: req.files, body: req.body });

}
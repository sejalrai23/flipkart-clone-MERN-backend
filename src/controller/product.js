const Products = require("../models/product");
const slugify = require("slugify");
const shortid = require("shortid");
const Category = require("../models/category")


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

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug }).exec((error, category) => {
        if (error) {
            return res.status(400).json({ error });
        }

        if (category) {
            Products.find({ category: category._id }).exec((error, products) => {

                if (error) {
                    return res.status(400).json({ error });
                }
                if (products.length > 0) {
                    res.status(200).json({
                        products,
                        productsByPrice: {
                            under5k: products.filter(product => product.price <= 5000),
                            under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                            under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                            under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                            under30k: products.filter(product => product.price > 20000 && product.price <= 30000)
                        }
                    });
                }

            })
        }

        // res.status(200).json({ category });
    })

}

exports.getProductDetails = (req, res) => {
    const { productId } = req.params;
    console.log(productId);
    if (productId) {
        Products.find({ _id: productId }).exec((error, pro) => {
            console.log("hello");
            if (error) {
                return res.status(400).json({ error: error })
            };
            if (pro) {
                res.status(200).json({ pro });
            }
        })
    } else {
        return res.status(400).json({ error: 'Prams requied' });
    }
}
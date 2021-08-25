const Cart = require("../models/cart");
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

exports.addItemToCart = (req, res) => {
    // return res.status(200).json({ message: "cart" });

    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
        if (error) {
            return res.status(400).json({ error });
        }
        if (cart) {
            const productId = req.body.cartItem.product
            console.log(productId);
            const productexist = cart.cartItem.find(c => c.product == productId);

            let condition,action;


            if (productexist) {
                condition = { "user": req.user._id, "cartItem.product": productId };
                action = {
                    "$set": {
                        "cartItem.$": {
                            ...req.body.cartItem,
                            quantity: productexist.quantity + req.body.cartItem.quantity
                        }
                    }
                };
            } else {
                condition = { user: req.user._id };
                action = {
                    "$push": {
                        "cartItem": req.body.cartItem
                    }
                };
            }
            Cart.findOneAndUpdate(condition, action).exec((error, _cart) => {
                if (error) { return res.status(400).json({ error }) }
                if (_cart) {
                    return res.status(201).json({ cart: _cart });
                }
            })

        }
        else {
            const cart = new Cart({
                user: req.user._id,
                cartItem: req.body.cartItem
            });
            cart.save((error, cart) => {
                if (error) {
                    return res.status(400).json({ error });
                }
                if (cart) { return res.status(200).json({ cart })};
            })
        }
    })
}
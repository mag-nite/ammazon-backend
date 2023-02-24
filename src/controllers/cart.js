const Cart = require('../models/cart')
exports.addToCart = (req,res)=>{
    Cart.findOne({user: req.user._id})
    .exec((error,cart)=>{
        if(error) return res.status(400).json({error})
        // if cart exist update the cart 
        if(cart){ 
            const product = req.body.cartItems.product
            const product_exists = cart.cartItems.find(c=> c.product== product)
            if(product_exists){
                Cart.findOneAndUpdate({user: req.user._id,"cartItems.product": product},{
                    "$set":{
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: product_exists.quantity + req.body.cartItems.quantity,
                            price: product_exists.price + req.body.cartItems.price
                        }
                    }
                })
                .exec((error,_cart)=>{
                    if(error) return res.status(400).json({error})
                    if(_cart) {return res.status(201).json({cart:_cart})}
                })
            }
            else{
                Cart.findOneAndUpdate({user: req.user._id},{
                    "$push":{
                        "cartItems": [req.body.cartItems]
                    }
                })
                .exec((error,_cart)=>{
                    if(error) return res.status(400).json({error})
                    if(_cart) {return res.status(201).json({cart:_cart})}
                })
            } 
            }
        
        else{
            // else create a new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            })
            cart.save((error,cart)=>{
                if(error) return res.status(400).json({error})
                if(cart) return res.status(200).json({cart})
            })
        }
    })
  
}
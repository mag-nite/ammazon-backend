const slugify = require('slugify');
const product = require('../models/product')
const shortid = require('shortid')
exports.addProduct = (req,res) =>{
    const {name,price,description,ProductPictures,category,createdBy,quantity} = req.body
    
    const Product = new product({
        name: name,
        slug: slugify(name),
        price,
        description,
        // ProductPictures,
        category,
        createdBy: req.user._id,
        quantity
    });
    
    Product.save(((error,product)=>{
        if(error){return res.status(400).json({error})}
        if(product){return res.status(200).json({product})}
    })) 
    // res.status(200).json({file: req.file,body: req.body})
}

exports.fetchProduct = (req,res)=>{
    product.find({})
    .exec((error,products)=>{
        if(error) return res.status(400).json({error})
        if(products) return res.status(200).json({products})

    })
}
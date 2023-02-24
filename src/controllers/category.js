const slugify = require('slugify');
const category = require('../models/category')
exports.addCategory = (req,res) =>{
    const CategoryObj= {
        name: req.body.name,
        slug: slugify(req.body.name)        
    }
    if (req.body.parentId) {
        CategoryObj.parentId = req.body.parentId
    }
    const cat = new category(CategoryObj);
    cat.save((error,category)=>{
        if(error) return res.status(400).json({error})
        if(category) return res.status(200).json({category})
    })
}

exports.fetchCategory = (req,res)=>{
    category.find({})
    .exec((error,categories)=>{
        if(error) return res.status(400).json({error})
        if(categories) return res.status(200).json({categories})

    })
}